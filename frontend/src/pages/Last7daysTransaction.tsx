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
      className="min-h-screen flex flex-col items-center p-4 md:p-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Today's Sales Section */}
      <TodaySell />

      {/* Chart Section */}
      <div className="mt-6 w-full max-w-[90vw] bg-white shadow-md rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-2xl font-bold text-center text-gray-700 mb-4">
          📊 Sales Revenue Over the Last 7 Days
        </h2>

        {/* Handle loading and errors */}
        {isLoading ? (
          <p className="text-center text-gray-500">⏳ Loading chart...</p>
        ) : error ? (
          <p className="text-center text-red-500">❌ Error loading data</p>
        ) : (
          <div className="w-full flex justify-center h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical" // Mobile-friendly vertical layout
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.4} />

                {/* Y-Axis (Date) on the left for mobile readability */}
                <YAxis
                  type="category"
                  dataKey="date"
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString()
                  }
                  tick={{ fontSize: 12, fill: "#4F46E5" }}
                  width={70}
                />

                {/* X-Axis (Revenue) on the bottom */}
                <XAxis
                  type="number"
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fontSize: 12, fill: "#4F46E5" }}
                />

                <Tooltip
                  cursor={{ fill: "rgba(79, 70, 229, 0.2)" }}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />

                {/* Bars with Animation */}
                <Bar
                  dataKey="revenue"
                  fill="url(#colorGradient)"
                  barSize={30} // Adjusted for better mobile visibility
                  radius={[6, 6, 0, 0]}
                />

                {/* Gradient Fill for Bars */}
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Last7daysTransaction;
