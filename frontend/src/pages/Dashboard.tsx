import { useQuery } from "@tanstack/react-query";
import Navbar from "./Navbar";
import { fetchItems, Item } from "../services/Api";
import { useNavigate } from "react-router-dom";
import SellItem from "./SellItem";

const Dashboard: React.FC = () => {
  const { data: items, isLoading, error } = useQuery<Item[], Error>({
    queryKey: ["items"],
    queryFn: fetchItems,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Do not refetch when switching tabs
    retry: 2, // Retry failed requests 2 times
  });

  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/updateDelete/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl w-full bg-white text-center rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-center">Item List</h2>

          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error: {error.message}</p>
          ) : items?.length === 0 ? (
            <p className="text-center">No items available.</p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="p-4 border text-center rounded-lg shadow-md bg-gray-50"
                >
                  <div className="mb-6" onClick={() => handleClick(item.id)}>
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-10 h-10 mx-auto object-cover rounded-lg mt-3"
                      />
                    )}
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                    <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                  </div>
                  <SellItem id={item.id} />
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
