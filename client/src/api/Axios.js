import { api } from "./Config";

export const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/users', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};