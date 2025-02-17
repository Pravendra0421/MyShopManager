import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const AddItem = () => {
    const [input, setInput] = useState<{ name: string; price: number; stock: number; image: File | null }>({
        name: "",
        price: 0,
        stock: 0,
        image: null
    });
    const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value, type, files } = e.target;

        if (type === "file" && files) {
            setInput((prev) => ({ ...prev, image: files[0] }));
        } else {
            setInput((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
        }

    };
    //handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("price", input.price.toString());
        formData.append("stock", input.stock.toString());
    
        if (input.image) {
            formData.append("image", input.image);
        }
    
        try {
            await axios.post("http://localhost:3000/item/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            // console.log("Server Response:", response.data);
            alert("Item added successfully!");
    
        } catch (error) {
            console.error("Error adding item:", error);
            alert("Failed to add item!");
        }
    };

    return (
        <>
        <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-xl h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 p-4">
                {/* <img className="w-full h-56 object-cover" src={image} alt="Product Preview" /> */}
                <div className="p-4">
                {input.image && (
                     <img src={URL.createObjectURL(input.image)} alt="Preview" className="w-10 h-10 object-cover rounded-lg mb-5" />
                     )}
                    <h2 className="text-xl text-center mb-10 font-semibold text-gray-800">Add New Item</h2>
                    <form onSubmit={handleSubmit} className="mt-4 mb-10 ">
                        <h3 className="mb-2"> Name:</h3>
                        <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange}
                        value={input.name}
                        placeholder="Enter Name" 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none mb-5 focus:ring-2 focus:ring-blue-500" 
                        required  />
                        <h3 className="mb-2">Price:</h3>
                        <input type="number"
                         name="price" 
                         value={input.price}
                         onChange={handleChange}
                         placeholder="Enter Price" 
                         className="w-full  px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                         required  />
                        <h3 className="mb-2">Stock:</h3>
                        <input type="number" 
                        name="stock" 
                        placeholder="Enter Stock" 
                        className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value={input.stock}
                        onChange={handleChange}
                        required />
                        <h3 className="mb-2">Image:</h3>
                        <input type="file" 
                        name="image"
                        onChange={handleChange}
                        className="w-full mt-2 px-3 py-2 border rounded-lg mb-7 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        accept="image/*" required  />
                        <button type="submit" 
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default AddItem;
