import api from "./Base"; // Import the axios instance

export interface Item {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url?: string;
}
export const login=async(inputData:{email:string,password:string}):Promise<any>=>{
  const response = await api.post("/auth/login",inputData);
  return response.data;
}
export const signUp=async(inputData:{email:string,password:string}):Promise<any>=>{
  const response = await api.post("/auth/signup",inputData);
  return response.data;
}
export const addItem = async (formData: FormData): Promise<any> => {
  const response = await api.post("/item/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fetchItems = async (): Promise<Item[]> => {
  const response = await api.get<Item[]>("/item");
  return response.data;
};

export const fetchItemDetails = async (id: string): Promise<Item> => {
  const response = await api.get<Item>(`/item/${id}`);
  return response.data;
};

export const deleteItem = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/item/delete/${id}`);
  return response.data;
};

export const updateItem = async (id: string, updatedData: { price: number; stock: number }) => {
  const response = await api.put(`/item/update/${id}`, updatedData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const sellItem = async (id: string, quantity: number): Promise<any> => {
  try {
    const response = await api.post("/sales/sell", { id, quantity }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error selling item:", error);
    throw error;
  }
};

export const revenueData = async ():Promise<any>=>{
  try {
    const response= await api.get("/sales/revenue");
    return response.data;
    
  } catch (error) {
    console.log(error);
  }
};
export const todaySell=async():Promise<any>=>{
  try {
    const response=await api.get("/sales/today");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const last7Days=async():Promise<any>=>{
  try {
    const response = await api.get("/sales/last7days");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
