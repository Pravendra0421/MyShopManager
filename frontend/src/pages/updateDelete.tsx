import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItem, fetchItemDetails, updateItem } from "../services/Api";
import Navbar from "./Navbar";
import { Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateDelete: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Allow undefined to handle errors
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  // Fetch item details
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

  // Mutation for updating an item
  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("No item ID found");
      return updateItem(id, { ...item, price, stock });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("✅ Item updated successfully!", { position: "top-center" });
      setTimeout(() => navigate("/"), 1000);
    },
    onError: (error) => {
      toast.error(`❌ Failed to update: ${error.message}`, { position: "top-center" });
    },
  });

  // Mutation for deleting an item
  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!id) throw new Error("No item ID found");
      return deleteItem(id);
    },
    onSuccess: () => {
      toast.success("🗑️ Item deleted successfully!", { position: "top-center" });
      setTimeout(() => navigate("/"), 1000);
    },
    onError: (error) => {
      toast.error(`❌ Failed to delete: ${error.message}`, { position: "top-center" });
    },
  });

  const handleUpdate = () => updateMutation.mutate();

  const handleDelete = () => {
    toast.warn(
      <div>
        <p className="text-center">⚠️ Are you sure you want to delete this item?</p>
        <div className="flex justify-center gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            onClick={() => {
              toast.dismiss();
              deleteMutation.mutate();
            }}
          >
            Yes, Delete
          </button>
          <button className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600" onClick={() => toast.dismiss()}>
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, toastId: "delete-confirmation" }
    );
  };

  if (!id) {
    return <div className="text-center text-red-500 text-lg font-semibold">❌ Error: No Item ID provided.</div>;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all hover:shadow-2xl">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-5">Update Item</h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
              <p className="text-gray-600 mt-2">Loading item details...</p>
            </div>
          ) : error ? (
            <p className="text-center text-red-500 font-medium">❌ {error.message}</p>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">💰 Price:</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">📦 Stock:</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center disabled:opacity-50"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "Update"}
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-500 text-white p-2 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center disabled:opacity-50"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "Delete"}
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
