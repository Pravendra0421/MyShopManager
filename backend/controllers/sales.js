import supabase from "../database/supabase.js";

export const sellItem = async (req, res) => {
    const { id, quantity } = req.body;

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
        .insert([{ item_id: id, quantity, revenue }]);

    if (salesError) {
        return res.status(500).json({ error: "Failed to record sale" });
    }

    res.json({ message: "Sale successful", newStock, revenue });
};

// ✅ Fetch total revenue
export const getTotalRevenue = async (req, res) => {
    const { data, error } = await supabase.from("sales").select("revenue");

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const totalRevenue = data.reduce((acc, sale) => acc + parseFloat(sale.revenue), 0);
    res.json({ totalRevenue });
};

// ✅ Fetch last 7 days of sales
export const getLast7DaySales = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data, error } = await supabase
        .from("sales")
        .select("quantity, revenue, date")
        .gte("date", sevenDaysAgo.toISOString());

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};
