import { motion } from "framer-motion";
import { todaySell } from "../services/Api";
import { useQuery } from "@tanstack/react-query";

// Define the transaction type
interface Transaction {
  name: string;
  date: string;
  quantity: number;
  revenue: number;
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
    <>
      <h1 className="text-xl md:text-3xl font-bold text-center mt-10 text-gray-800 mb-4">
        Today Transactions
      </h1>

      {/* Scrollable Table */}
      <div className="w-full overflow-auto max-h-64 border border-gray-300 shadow-md rounded-lg">
        <motion.table
          className="w-full border-collapse"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm md:text-base">
              <th className="p-2 md:p-4 border border-gray-300">Name</th>
              <th className="p-2 md:p-4 border border-gray-300">Date & Time</th>
              <th className="p-2 md:p-4 border border-gray-300">Quantity</th>
              <th className="p-2 md:p-4 border border-gray-300">Revenue ($)</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-red-500">
                  Error fetching transactions.
                </td>
              </tr>
            ) : transactions?.length ? (
              transactions.map((txn: Transaction, index: number) => (
                <motion.tr
                  key={index}
                  className="text-center bg-white hover:bg-gray-100 transition-all duration-300 text-xs md:text-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="p-2 md:p-4 border border-gray-300">{txn.items.name}</td>
                  <td className="p-2 md:p-4 border border-gray-300">
                    {new Date(txn.date).toLocaleDateString()} <br />
                    <span className="text-gray-500 text-xs">
                      {new Date(txn.date).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="p-2 md:p-4 border border-gray-300">{txn.quantity}</td>
                  <td className="p-2 md:p-4 border border-gray-300 text-green-600 font-semibold">
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

    </>
  );
};

export default TodaySell;
