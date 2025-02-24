import axios from "axios";

const BASE_URL = "http://localhost:3000";

export interface Item {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url?: string;
}

export const addItem = async (formData: FormData): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/item/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fetchItems = async (): Promise<Item[]> => {
  const response = await axios.get<Item[]>(`${BASE_URL}/item`);
  return response.data;
};

export const fetchItemDetails = async (id: string): Promise<Item> => {
  const response = await axios.get<Item>(`${BASE_URL}/item/${id}`);
  return response.data;
};

export const deleteItem = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${BASE_URL}/item/delete/${id}`);
  return response.data; // Return response to handle success/failure
};

export const updateItem = async (id: string, updatedData: { price: number; stock: number }) => {
    const response = await axios.put(`${BASE_URL}/item/update/${id}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  export const sellItem = async (id: string, quantity: number): Promise<any> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/sales/sell`,
        { id, quantity },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error selling item:", error);
      throw error; // Rethrow error for handling in components
    }
  };

  