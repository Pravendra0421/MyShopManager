import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import TodaySell from "./TodaySell";

const Last7daysTransaction = () => {
    const [revenueData, setRevenueData] = useState<{ date: string; revenue: number }[]>([]);
    useEffect(() => {
        async function fetchLast7DaysRevenue() {
            try {
                const response = await axios.get("http://localhost:3000/sales/last7days");
                const rawData = response.data;

                const formattedData = Object.keys(rawData).map((date) => ({
                    date, 
                    revenue: rawData[date] || 0, 
                }));

                setRevenueData(formattedData);
            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        }

        fetchLast7DaysRevenue();
    }, []);

    return (
        <motion.div 
            className="h-screen overflow-hidden flex flex-col items-center p-4 md:p-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <TodaySell/>

            {/* Chart Section (No Scroll) */}
            <div className="mt-4 w-full flex-grow">
            <h2 className="text-lg md:text-2xl font-bold text-center text-gray-700 mb-4">
                Sales Revenue Over the Last 7 Days
            </h2>

            {/* Chart Container */}
            <div className="w-full flex justify-center h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 20, right: 20, left: -10, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="date" 
                            tickFormatter={(date) => new Date(date).toLocaleDateString()} 
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
        </div>
        </motion.div>
    );
};

export default Last7daysTransaction;
