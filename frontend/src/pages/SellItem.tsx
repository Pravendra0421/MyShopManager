import { useState } from "react";
import Button from "./Button";
import axios from "axios";
interface SellItemProps{
  id:string;
}

const SellItem: React.FC<SellItemProps> = ({id}) => {
    const [sell, setSell] = useState<number>(0);
    const handleIncrement = () => {
        setSell((prevSell) => prevSell + 1);
    };

    const handleDecrement = () => {
        setSell((prevSell) => (prevSell > 0 ? prevSell - 1 : 0)); 
    };
    const sellProduct = async () => {
      try {
        console.log("Selling Product - ID:", id, "Quantity:", sell);
    
        const response = await axios.post(
          "http://localhost:3000/sales/sell",
          {
            id,
            quantity: sell, // ✅ Fixed spelling mistake (was "quatity")
          },
          {
            headers: {
              "Content-Type": "application/json", // ✅ Explicitly set Content-Type
            },
          }
        );
    
        console.log("Sell Product Response:", response.data);
      } catch (error) {
        console.error("Error selling product:", error);
      }
    };
    
    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 p-3 bg-white rounded-lg shadow-md w-full max-w-[300px] mx-auto">
            {/* Counter Buttons */}
            <div className="flex items-center space-x-2">
                <button 
                    onClick={handleDecrement} 
                    className="w-10 h-10 shadow-md bg-red-400 text-white rounded-full font-bold text-xl transition-all hover:bg-red-600 active:scale-95 flex items-center justify-center"
                >
                    −
                </button>

                <span className="text-lg font-semibold w-8 text-center">
                    {sell}
                </span>

                <button 
                    onClick={handleIncrement} 
                    className="w-10 h-10 shadow-md bg-green-400 text-white rounded-full font-bold text-xl transition-all hover:bg-green-600 active:scale-95 flex items-center justify-center"
                >
                    +
                </button>
            </div>

            {/* Sell Now Button (Stacks below on mobile) */}
            <div className="w-full sm:w-auto" onClick={sellProduct}>
                <Button />
            </div>
        </div>
    );
};

export default SellItem;
