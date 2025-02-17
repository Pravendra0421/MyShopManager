import supabase from "../database/supabase.js";
//sell item 
export const sellItem = async(req,res)=>{
    const {id,quantity}=req.body;
    const {data:item,error}=await supabase.from('items').select('*').eq('id',id).single();
    if(error ||!item){
        return res.status(404).json({
            error:"item not found"
        })
    }
    if(item.stock<quantity){
        return res.status(404).json({
            error:"item not found"
        })
    }
    const newStock=item.stock - quantity;
    const revenue=item.price*quantity;
    const {error:updateError} = await supabase.from('items').update({stock:newStock}).eq('id',id);
    if(updateError){
        return res.status(404).json({
            error:updateError.message
        })
    }
    const {error:salesError} = await supabase.from('sales').insert([{item_id:id,quantity,revenue}]);
    if(salesError){
        return res.status(404).json({
            error:salesError.message
        })
    }
    res.json({
        message:'sales successful',newStock,revenue
    })
};
//fetch total revenue
export const getTotalRevenue=async(req,res)=>{
    const {data,error} =await supabase.from('sales').select(revenue);
    if(error){
        return res.status(404).json({
            error:salesError.message
        })
    }
    const totalRevenue= data.reduce((acc,sale)=>acc+parseFloat(sale.revenue),0);
    res.json({totalRevenue});
}
// fetch last 7 day data
export const getLast7DaySales=async (req,res)=>{
    const sevenDayAgo=new Date();
    sevenDayAgo.setDate(sevenDayAgo.getDate()-7);
    const {data,error} = await supabase.from('sales').select('quantity,revenue,date').gte('date',sevenDayAgo.toISOString());
    if(error){
        return res.status(404).json({
            error:salesError.message
        })
    }
    res.json(data);
}