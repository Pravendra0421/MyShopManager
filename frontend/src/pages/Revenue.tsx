import axios from "axios";
import { useEffect, useState } from "react";
import Last7daysTransaction from "./Last7daysTransaction";

const Revenue = () => {
    const [revenue, setRevenue] = useState<number | null>(null); // Initialize as null
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/sales/revenue");
                setRevenue(response.data.totalRevenue);
            } catch (error) {
                console.error("Error fetching revenue:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex justify-center bg-gray-100 p-4">
            <div className="max-w-6xl w-full bg-white text-center rounded-2xl shadow-lg p-6">
                <div className="font-bold text-2xl">Total Revenue</div>

                {/* Show loading indicator or revenue amount */}
                <div className="mt-6 bg-green-300 font-bold text-4xl p-4 rounded-lg">
                    {loading ? "Loading..." : `$${revenue?.toLocaleString()}`}
                </div>
                <Last7daysTransaction/>
            </div>
        </div>
    );
};

export default Revenue;
