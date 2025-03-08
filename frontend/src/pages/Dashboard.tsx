import { useQuery } from "@tanstack/react-query";
import Navbar from "./Navbar";
import { fetchItems, Item } from "../services/Api";
import { useNavigate } from "react-router-dom";
import SellItem from "./SellItem";
import Revenue from "./Revenue";
import Loader from "../common/Loading";

const Dashboard: React.FC = () => {
  const { data: items, isLoading, error } = useQuery<Item[], Error>({
    queryKey: ["items"],
    queryFn: fetchItems,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/updateDelete/${id}`);
  };

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg p-4 md:p-6">
          {/* Header */}
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 text-center mb-4">
            📦 Item List
          </h2>

          {/* Loader */}
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <Loader />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">❌ Error: {error.message}</p>
          ) : items?.length === 0 ? (
            <p className="text-center text-gray-600">No items available.</p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {items?.map((item) => (
                <li
                  key={item.id}
                  className="p-3 sm:p-4 border rounded-xl shadow-md bg-gray-50 transition-all hover:shadow-lg hover:bg-gray-100"
                >
                  {/* Clickable Section */}
                  <div
                    className="cursor-pointer flex flex-col items-center space-y-2"
                    onClick={() => handleClick(item.id)}
                  >
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      💰 Price: <span className="font-semibold">${item.price}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      📦 Stock: <span className="font-semibold">{item.stock}</span>
                    </p>
                  </div>

                  {/* Sell Button */}
                  <div className="mt-2 sm:mt-4">
                    <SellItem id={item.id} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Revenue />
    </div>
  );
};

export default Dashboard;
