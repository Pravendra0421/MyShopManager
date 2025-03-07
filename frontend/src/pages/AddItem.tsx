import { useState } from "react";
import Navbar from "./Navbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem } from "../services/Api.ts"; 
import { predefineItems,ItemType } from "../data/data.ts";
import { ToastContainer, toast } from "react-toastify";
const AddItem = () => {
    const [input, setInput] = useState<{ 
        name: string; 
        price: number; 
        stock: number; 
        image: File | null; 
        image_url?: string; 
        type: ItemType;
    }>({
        name: "",
        price: 0,
        stock: 0,
        image: null,
        image_url: "", // Initialize with an empty string
        type: "fruits"
    });
    const [suggestions, setSuggestions] = useState<{ name: string; image: string }[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
    
        if (type === "file") {
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files?.[0];
            if (file) {
                setInput((prev) => ({ ...prev, image: file })); // Allow user to upload their image
            }
        } else {
            setInput((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
    
            if (name === "name") {
                updateSuggestions(value);
                 // Check if the name exists in predefined items
            const foundItem = predefineItems[input.type].find(item => item.name.toLowerCase() === value.toLowerCase());

            if (foundItem) {
                setInput(prev => ({ ...prev, image_url: foundItem.image, image: null })); // Set predefined image
            } else {
                setInput(prev => ({ ...prev, image_url: "", image: null })); // Allow manual image upload
            }
            }
        }
    };
    const updateSuggestions = (value: string) => {
        // If input is empty, show the full list of items based on selected type
        if (value.trim() === "") {
            setSuggestions(predefineItems[input.type]);
            return;
        }
    
        // Filter items based on input value
        const filteredSuggestions = predefineItems[input.type].filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
    
        setSuggestions(filteredSuggestions);
    };
    
    const handleSuggestionClick = (suggestion: { name: string; image: string }) => {
        setInput((prev) => ({ 
            ...prev, 
            name: suggestion.name, 
            image_url: suggestion.image, // Store predefined image URL
            image: null 
        }));
        setSuggestions([]);
    };
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (formData: FormData) => addItem(formData), 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["items"]});
            toast.success("✅ Item updated successfully!");
            setInput({ name: "", price: 0, stock: 0, image: null,type:"fruits" });
        },
        onError: () => {
            toast.error("❌ Something went wrong!");
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("price", input.price.toString());
        formData.append("stock", input.stock.toString());
    
        if (input.image) {
            formData.append("image", input.image);
        } else if (input.image_url) {
            formData.append("image_url", input.image_url); // Send predefined image URL
        }
    
        mutation.mutate(formData); 
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-xl h-auto bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-500 p-6">
                    <h2 className="text-xl text-center mb-6 font-semibold text-gray-800">Add New Item</h2>
                    <ToastContainer position="top-right" autoClose={3000} />
                    <form onSubmit={handleSubmit} className="mt-4">
                        <label className="block font-medium">Type:</label>
                        <select
                            name="type"
                            value={input.type}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none mb-5 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="fruits">Fruits</option>
                            <option value="vegetables">Vegetables</option>
                        </select>

                        <label className="block font-medium">Name:</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onFocus={()=>updateSuggestions("")}
                            value={input.name}
                            placeholder="Enter Name"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none mb-2 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {suggestions.length > 0 && (
                            <ul className="border border-gray-300 bg-white rounded-lg shadow-md max-h-32 overflow-auto mt-1">
                                {suggestions.map((item, index) => (
                                    <li
                                        key={index}
                                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
                                        onClick={() => handleSuggestionClick(item)}
                                    >
                                        <img src={item.image} alt={item.name} className="w-6 h-6 rounded-full mr-2" />
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <label className="block font-medium mt-4">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={input.price}
                            onChange={handleChange}
                            placeholder="Enter Price"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <label className="block font-medium mt-4">Stock:</label>
                        <input
                            type="number"
                            name="stock"
                            placeholder="Enter Stock"
                            className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={input.stock}
                            onChange={handleChange}
                            required
                        />

                        <label className="block font-medium mt-4">Image:</label>

                            {input.image ? (
                                <div className="flex justify-center my-3">
                                    <img src={URL.createObjectURL(input.image)} alt="Preview" className="w-24 h-24 object-cover rounded-lg shadow-md" />
                                </div>
                            ) : input.image_url ? (
                                <div className="flex justify-center my-3">
                                    <img src={input.image_url} alt="Predefined" className="w-40 ml-28 mr-28 h-24 object-cover rounded-lg shadow-md" />
                                </div>
                            ) : (
                                <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg shadow-md">
                                     <span className="text-gray-500">No Image</span>
                                </div>
                            )}


                            {!input.image_url && (
                                <>
                                    <label className="block font-medium mt-4">Upload Image:</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        className="w-full mt-2 px-3 py-2 border rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        accept="image/*"
                                    />
                                </>
                            )}


                        <button
                            type="submit"
                            className="mt-4 w-full bg-blue-600   text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddItem;
