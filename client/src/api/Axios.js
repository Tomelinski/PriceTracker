import { api } from "./Config";
import { SERVER_ROUTE } from './Constants';

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

export const fetchItem = async (itemURL) => {
  try {
    return await api.get(SERVER_ROUTE.ITEM, {
      params: { itemURL: itemURL },
    }).then((response) => response.data);
  } catch (error) {
    console.error('Error fetching Item Data:', error);
    return;
  }
}