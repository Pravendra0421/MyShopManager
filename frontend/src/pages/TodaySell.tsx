import { motion } from "framer-motion";
import { todaySell } from "../services/Api";
import { useQuery } from "@tanstack/react-query";
import { FiShoppingCart } from "react-icons/fi";

// Define the transaction type
interface Transaction {
  name: string;
  date: string;
  quantity: number;
  revenue: number;
  items: { name: string };
}

const TodaySell = () => {
  // Fetch today's transactions using useQuery
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery<Transaction[]>({
    queryKey: ["todaySell"],
    queryFn: todaySell,
    refetchInterval: 10000, // Auto-refresh every 10 seconds
  });

  return (
    <motion.div
      className="w-full max-w-[90vw] p-4 md:p-6 bg-white shadow-lg rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <FiShoppingCart className="text-blue-600 text-2xl md:text-3xl" />
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Today’s Transactions
        </h1>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-auto max-h-80 border border-gray-300 rounded-lg shadow-md">
        <motion.table
          className="w-full border-collapse"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs md:text-sm">
              <th className="p-3 md:p-4 border border-gray-300">Name</th>
              <th className="p-3 md:p-4 border border-gray-300">Date & Time</th>
              <th className="p-3 md:p-4 border border-gray-300">Quantity</th>
              <th className="p-3 md:p-4 border border-gray-300">Revenue ($)</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  ⏳ Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-red-500">
                  ❌ Error fetching transactions.
                </td>
              </tr>
            ) : transactions?.length ? (
              transactions.map((txn: Transaction, index: number) => (
                <motion.tr
                  key={index}
                  className="text-center bg-white hover:bg-gray-100 transition-all duration-300 text-xs md:text-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="p-3 md:p-4 border border-gray-300">{txn.items.name}</td>
                  <td className="p-3 md:p-4 border border-gray-300">
                      {new Intl.DateTimeFormat("en-AU", {
                        timeZone: "Australia/Sydney",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(txn.date + "Z"))}
                      <br />
                      <span className="text-gray-500 text-xs">
                        {new Intl.DateTimeFormat("en-AU", {
                          timeZone: "Australia/Sydney",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        }).format(new Date(txn.date + "Z"))}
                      </span>
                    </td>
                  <td className="p-3 md:p-4 border border-gray-300">
                    {txn.quantity}
                  </td>
                  <td className="p-3 md:p-4 border border-gray-300 text-green-600 font-semibold">
                    ${txn.revenue.toFixed(2)}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  No transactions available.
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
};

export default TodaySell;
