import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/item/");
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items!");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-center">Item List</h2>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : items.length === 0 ? (
            <p className="text-center">No items available.</p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((item) => (
                <li key={item.id} className="p-4 border text-center rounded-lg shadow-md bg-gray-50">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mt-3"
                    />
                  )}
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                  <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
