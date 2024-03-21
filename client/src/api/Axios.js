import { api } from "./Config";
import { SERVER_ROUTE } from "../constants/Constants";

export const fetchItem = async (itemId, itemURL) => {
  try {
    let url;
    let params;

    if (itemId) {
      url = `${SERVER_ROUTE.API.ITEM}/${itemId}`;
      params = null;
    } else if (itemURL) {
      url = SERVER_ROUTE.API.ITEM;
      params = { itemURL };
    } else {
      throw new Error("Either itemId or itemURL must be provided.");
    }
    const response = await api.get(url, { params });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Failed to fetch item. Status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching Item Data:", error);
    throw error;
  }
};

export const fetchDealItems = async (inStoreOnly, limit, page = 1) => {
  try {
    const url = SERVER_ROUTE.API.DEALS;
    const params = { inStoreOnly, limit, page };

    const response = await api.get(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params,
    });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Failed to fetch deal items. Status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching Deal Item Data:", error);
    throw error;
  }
};

export const fetchFavoriteItems = async (userId, limit, page = 1) => {
  try {
    const url = SERVER_ROUTE.API.USER.FAVORITE_ITEMS(userId);

    const response = await api.get(url, { limit, page });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Failed to fetch favorites. Status: ${response.status}`);
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
    }
    throw new Error(`Failed to fetch favorites. Status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching user favorite ids:", error);
    throw error;
  }
};

export const createFavorite = async (userId, itemId) => {
  try {
    const url = SERVER_ROUTE.API.FAVORITE.CREATE;

    const response = await api.post(url, {
      userId,
      itemId,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating favorite:", error);
    throw error;
  }
};

export const deleteFavorite = async (userId, itemId) => {
  try {
    const url = SERVER_ROUTE.API.FAVORITE.DELETE;

    const response = await api.post(url, {
      userId,
      itemId,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting favorite:", error);
    throw error;
  }
};

export const fetchNotificationItems = async (userId, limit, page = 1) => {
  try {
    const url = SERVER_ROUTE.API.USER.NOTIFICATION_ITEMS(userId);

    const response = await api.get(url, { limit, page });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(
      `Failed to fetch notification. Status: ${response.status}`,
    );
  } catch (error) {
    console.error("Error fetching user notification items:", error);
    throw error;
  }
};

export const fetchNotificationIds = async (userId) => {
  try {
    const url = SERVER_ROUTE.API.USER.NOTIFICATIONS(userId);

    const response = await api.get(url);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(
      `Failed to fetch notification. Status: ${response.status}`,
    );
  } catch (error) {
    console.error("Error fetching user notification ids:", error);
    throw error;
  }
};

export const createNotification = async (userId, itemId, threshold) => {
  try {
    const url = SERVER_ROUTE.API.NOTIFICATION.CREATE;

    const response = await api.post(url, {
      userId,
      itemId,
      threshold,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

export const deleteNotification = async (userId, itemId) => {
  try {
    const url = SERVER_ROUTE.API.NOTIFICATION.DELETE;

    const response = await api.post(url, {
      userId,
      itemId,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};
