import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteItem, fetchItemDetails, updateItem } from "../services/Api";
import Navbar from "./Navbar";

const UpdateDelete: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Allow undefined to handle errors
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  // Fetch item details when component loads
  const { data: item, isLoading, error } = useQuery({
    queryKey: ["item", id],
    queryFn: () => {
      if (!id) throw new Error("No item ID provided");
      return fetchItemDetails(id);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (item) {
      setPrice(item.price);
      setStock(item.stock);
    }
  }, [item]);

  const showAlert = (message: string, type: "success" | "error") => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  // Mutation for updating an item
  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("No item ID found");
  
      // Preserve existing data (like image) and only update price & stock
      return updateItem(id, {
        ...item, // Keep all previous item data (including image)
        price,
        stock,
      });
    },
    onSuccess: () => {
      showAlert("Item updated successfully!", "success");
      setTimeout(() => navigate("/"), 1000);
    },
    onError: (error) => {
      showAlert(`Failed to update item: ${error.message}`, "error");
    },
  });

  // ✅ Corrected handleUpdate function
  const handleUpdate = () => {
    updateMutation.mutate(); // Triggers the mutation
  };

  // Mutation for deleting an item
  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!id) throw new Error("No item ID found");
      return deleteItem(id);
    },
    onSuccess: () => {
      showAlert("Item deleted successfully!", "success");
      setTimeout(() => navigate("/"), 1000);
    },
    onError: (error) => {
      showAlert(`Failed to delete item: ${error.message}`, "error");
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate();
    }
  };

  if (!id) {
    return <div className="text-center text-red-500">❌ Error: No Item ID provided.</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Update Item</h2>

        {alertMessage && (
          <div className={`text-white p-2 mb-4 text-center rounded-md ${alertType === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {alertMessage}
          </div>
        )}

        {isLoading ? (
          <p className="text-center text-gray-500">Loading item details...</p>
        ) : error ? (
          <p className="text-center text-red-500">❌ {error.message}</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium">Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Stock:</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Updating..." : "Update"}
              </button>
              <button
                onClick={handleDelete}
                className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default UpdateDelete;
