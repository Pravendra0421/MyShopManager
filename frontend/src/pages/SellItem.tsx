import { useState } from "react";
import Button from "./Button";
import { sellItem } from "../services/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface SellItemProps{
  id?:string;
  stock?:number;
}

const SellItem: React.FC<SellItemProps> = ({id,stock}) => {
    const [sell, setSell] = useState<number>(0);
    const queryClient = useQueryClient();
    const handleIncrement = () => {
        setSell((prevSell) =>(prevSell<(stock??0)? prevSell + 1:prevSell));
    };

    const handleDecrement = () => {
        setSell((prevSell) => (prevSell > 0 ? prevSell - 1 : 0)); 
    };
    const mutation = useMutation({
      mutationFn:async () => {
        if (!id) return Promise.reject(new Error("Missing item ID"));
        if (sell === 0) return Promise.reject(new Error("Cannot sell 0 items"));
        return sellItem(id, sell);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["revenue"] });
        queryClient.invalidateQueries({ queryKey: ["last7days"] });
        queryClient.invalidateQueries({ queryKey: ["todaySell"] });
        queryClient.invalidateQueries({queryKey:["items"]})
        setSell(0);
      },
    });
    const isLoading = mutation.status === "pending"; // ✅ Correct

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 p-3 bg-white rounded-lg shadow-md w-full max-w-[300px] mx-auto">
            {/* Counter Buttons */}
            <div className="flex items-center space-x-2 ">
                <button 
                    onClick={handleDecrement} 
                    className="w-8 h-8 lg:h-10 lg:w-10 shadow-md bg-red-400 text-white rounded-full font-bold text-xl transition-all hover:bg-red-600 active:scale-95 flex items-center justify-center"
                >
                    −
                </button>
                <span className="text-lg font-semibold lg:w-10  text-center">
                    {sell}
                </span>

                <button 
                    onClick={handleIncrement} 
                    className="w-8 h-8 lg:h-10 lg:w-10 shadow-md bg-green-400 text-white rounded-full font-bold text-xl transition-all hover:bg-green-600 active:scale-95 flex items-center justify-center"
                >
                    +
                </button>
            </div>

            {/* Sell Now Button (Stacks below on mobile) */}
            <div className="w-full sm:w-auto">
                <Button  onClick={() => mutation.mutate()} 
                        disabled={isLoading || sell === 0}
                        >
                           {isLoading ? "Selling..." : "Sell Now"}
                </Button>
            </div>
        </div>
    );
};

export default SellItem;
