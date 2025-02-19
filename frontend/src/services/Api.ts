import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const addItem = async (formData: FormData): Promise<any> => {
    const response = await axios.post(`${BASE_URL}/item/add`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
export const fetchItems = async ():Promise<any>=>{
    const response = await axios.get(`${BASE_URL}/item`,);
    return response.data
};

export const deleteItem = async(id:string):Promise<any>=>{
    await axios.delete(`${BASE_URL}/item/delete/${id}`);
};

