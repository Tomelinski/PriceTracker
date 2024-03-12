import { api } from "./Config";
import { SERVER_ROUTE } from '../constants/Constants';

export const fetchItem = async (itemId, itemURL) => {
  try {
    let url;
    let params;
    
    if (itemId) {
      url = `${SERVER_ROUTE.API.ITEM}/${itemId}`;
      params = null;
    } else if (itemURL) {
      url = SERVER_ROUTE.API.ITEM;
      params = { itemURL: itemURL };
    } else {
      throw new Error("Either itemId or itemURL must be provided.");
    }
    const response = await api.get(url, { params: params });
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch item. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching Item Data:", error);
    throw error;
  }
};

export const fetchDealItems = async (inStoreOnly = null, limit, page = 1) => {
  try {
    const url = SERVER_ROUTE.API.DEALS;
    const params = { inStoreOnly: inStoreOnly, limit: limit, page: page };

    const response = await api.get(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch deal items. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching Deal Item Data:", error);
    throw error;
  }
};

export const fetchFavoriteItems = async (userId, limit, page = 1) => {
  try {
    const url = SERVER_ROUTE.API.USER.FAVORITE_ITEMS(userId);

    const response = await api.get(url, { limit: limit, page: page } );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch favorites. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching user favorites items:", error);
    throw error;
  }
};

export const fetchFavoriteIds = async (userId) => {
  try {
    const url = SERVER_ROUTE.API.USER.FAVORITES(userId);

    const response = await api.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch favorites. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching user favorite ids:", error);
    throw error;
  }
};

export const createFavorites = async (userId, itemId) => {
  try {
    const url = SERVER_ROUTE.API.FAVORITES.CREATE;

    const response = await api.post(url, {
       userId: userId, 
       itemId: itemId 
    });

    return response.data;
  } catch (error) {
    console.error("Error creating favorite:", error);
    throw error;
  }
};

export const deleteFavorites = async (userId, itemId) => {
  try {
    const url = SERVER_ROUTE.API.FAVORITES.DELETE;

    const response = await api.post(url, {
      userId: userId,
      itemId: itemId
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting favorite:", error);
    throw error;
  }
};
