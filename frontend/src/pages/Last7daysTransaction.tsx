import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { last7Days } from "../services/Api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import TodaySell from "./TodaySell";

const Last7daysTransaction = () => {
  // Fetch last 7 days' revenue using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["last7days"],
    queryFn: last7Days,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes to prevent unnecessary API calls
    select: (rawData) =>
      Object.keys(rawData).map((date) => ({
        date,
        revenue: rawData[date] || 0,
      })),
  });

  return (
    <motion.div
      className="h-screen overflow-hidden flex flex-col items-center p-4 md:p-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Today's Sales Section */}
      <TodaySell />

      {/* Chart Section */}
      <div className="mt-16 w-full flex-grow">
        <h2 className="text-lg md:text-2xl font-bold text-center text-gray-700 mb-4">
          Sales Revenue Over the Last 7 Days
        </h2>

        {/* Handle loading and errors */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading chart...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading data</p>
        ) : (
          <div className="w-full flex justify-center h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 20, left: -10, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString()
                  }
                  tick={{ fontSize: 12 }}
                  angle={-90}
                  textAnchor="end"
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4F46E5" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Last7daysTransaction;
