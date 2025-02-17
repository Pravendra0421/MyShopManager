import supabase from "../database/supabase.js";
//fetch all item
export const getAllitems= async(req,res)=>{
    const {data,error }= await supabase.from('items').select('*');
    if(error){
        return res.status(500).json({
            success:false,
            message:"all data is not fetch"
        });
    }
    else{
        res.json(data);
    }
};
// add new item 
export const addItem = async(req,res)=>{
    const {name,price,stock}=req.body;
    const{error}=await supabase.from('items').insert([{name,price,stock}]);
    if(error){
        return res.status(404).json({
            success:false,
            error:error.message
        })
    }
    res.json({message:'item added successfully'});
};
//update an item 
export const updateItem= async(req,res)=>{
    const {id}=req.params;
    const {name,price,stock}=req.body;
    const {error} = await supabase.from('items').update({name,price,stock}).eq('id',id);
    if(error){
        return res.status(404).json({
            success:false,
            error:error.message
        })
    }
    res.json({message:"item updated successfully"});
}
//delete an item
export const deleteItem = async(req,res)=>{
    const {id}=req.params;
    const {error}=await supabase.from('items').delete().eq('id',id);
    if(error){
        return res.status(404).json({
            success:false,
            error:error.message
        })
    }
    res.json({message:"item deleted successfully"});
}