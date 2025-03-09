import { useQuery } from "@tanstack/react-query";
import { revenueData } from "../services/Api";
import Last7daysTransaction from "./Last7daysTransaction";

const Revenue = () => {
  // Use `useQuery` for automatic updates
  const { data, isLoading, isError } = useQuery({
    queryKey: ["revenue"],  // Unique cache key
    queryFn: revenueData,   // Fetch revenue API call
    staleTime: 1000 * 60,   // Cache for 1 minute
  });

  return (
    <div className="flex justify-center bg-gray-100 p-4">
      <div className="max-w-6xl w-full bg-white text-center rounded-2xl shadow-lg pt-6">
        <div className="font-bold text-2xl">Total Revenue</div>

        {/* Show loading indicator or revenue amount */}
        <div className="m-6 bg-green-300 font-bold text-4xl p-4 rounded-lg">
          {isLoading
            ? "Loading..."
            : isError
            ? "Failed to fetch data"
            : `$${data?.totalRevenue?.toLocaleString()}`}
        </div>

        <Last7daysTransaction />
      </div>
    </div>
  );
};

export default Revenue;
