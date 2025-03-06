import supabase from "../database/supabase.js";

export const sellItem = async (req, res) => {
    const { id, quantity } = req.body;
    const user_id=req.user.id;
    const { data: item, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !item) {
        return res.status(404).json({ error: "Item not found" });
    }

    if (item.stock < quantity) {
        return res.status(400).json({ error: "Not enough stock available" });
    }

    // Calculate new stock and revenue
    const newStock = item.stock - quantity;
    const revenue = item.price * quantity;

    // Update stock
    const { error: updateError } = await supabase
        .from("items")
        .update({ stock: newStock })
        .eq("id", id);

    if (updateError) {
        return res.status(500).json({ error: "Failed to update stock" });
    }

    // Insert sales record
    const { error: salesError } = await supabase
        .from("sales")
        .insert([{ item_id: id, quantity, revenue,user_id }]);

    if (salesError) {
        return res.status(500).json({ error: "Failed to record sale" });
    }

    res.json({ message: "Sale successful", newStock, revenue });
};

// ✅ Fetch total revenue
export const getTotalRevenue = async (req, res) => {
    const user_id=req.user.id;
    const { data, error } = await supabase.from("sales").select("revenue").eq("user_id",user_id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const totalRevenue = data.reduce((acc, sale) => acc + parseFloat(sale.revenue), 0);
    res.json({ totalRevenue });
};

export const getTodaySales = async(req,res)=>{
    const user_id=req.user.id
    const today = new Date();
    today.setHours(0,0,0,0); // reset to start of the day
    const {data,error} = await supabase
    .from("sales")
    .select("quantity,revenue,date,items(name)")
    .eq("user_id",user_id)
    .gte("date",today.toISOString())
    .order("date",{ascending:false});
if(error){
    return res.status(500).json({error:error.message})
}
res.json(data);
};


// ✅ Fetch last 7 days of sales
export const getLast7DaySales = async (req, res) => {
    const user_id=req.user.id;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Start from 6 days ago to today

    const { data, error } = await supabase
        .from("sales")
        .select("revenue, date")
        .eq("user_id",user_id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    // Group revenue by date
    const revenueByDay = {};
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split("T")[0]; // Format YYYY-MM-DD
        revenueByDay[dateString] = 0; // Default revenue 0
    }

    // Sum revenue for each day
    data.forEach((sale) => {
        const saleDate = new Date(sale.date).toISOString().split("T")[0];
        if (revenueByDay[saleDate] !== undefined) {
            revenueByDay[saleDate] += parseFloat(sale.revenue);
        }
    });

    res.json(revenueByDay);
};
