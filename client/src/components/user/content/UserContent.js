import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import AuthContext from "../../../context/authContext";
import {
  createFavorite,
  deleteFavorite,
  createNotification,
  deleteNotification,
  fetchFavoriteIds,
  fetchFavoriteItems,
  fetchNotificationIds,
  fetchNotificationItems,
} from "../../../api/Axios";
import { DEAL_LIMIT } from "../../../constants/Constants";
import { ItemGrid } from "../../item/Grid";

const UserContent = () => {
  const auth = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [notificationProducts, setNotificationProducts] = useState([]);
  const [favoritesPerPage, setFavoritesPerPage] = useState(DEAL_LIMIT);
  const [notificationsPerPage, setNotificationsPerPage] = useState(DEAL_LIMIT);

  const manageFavorites = async (productId) => {
    try {
      if (auth?.isLoggedIn) {
        const isFavorited = favorites.includes(productId);

        if (isFavorited) {
          await deleteFavorite(auth.user.id, productId);
        } else {
          await createFavorite(auth.user.id, productId);
        }

        setFavorites((prevFavorites) => (isFavorited
          ? prevFavorites.filter((id) => id !== productId)
          : [...prevFavorites, productId]));
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const manageNotifications = async (productId, threshold) => {
    try {
      if (auth?.isLoggedIn) {
        const isActiveNotification = notifications.includes(productId);

        if (isActiveNotification) {
          await deleteNotification(auth.user.id, productId);
        } else {
          await createNotification(auth.user.id, productId, threshold);
        }

        setNotifications((prevNotifications) => (isActiveNotification
          ? prevNotifications.filter((id) => id !== productId)
          : [...prevNotifications, productId]));
      }
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };

  useEffect(() => {
    const getFavorites = async () => {
      try {
        if (auth?.isLoggedIn) {
          const favoritesResponse = await fetchFavoriteIds(auth.user.id);

          if (favoritesResponse) {
            setFavorites(favoritesResponse);
          }
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    getFavorites();
  }, [auth]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const favProductsResponse = await fetchFavoriteItems(
          auth.user.id,
          favoritesPerPage,
        );

        if (favProductsResponse?.data) {
          setFavoriteProducts(favProductsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [favoritesPerPage]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const notifProductsResponse = await fetchNotificationItems(
          auth.user.id,
          notificationsPerPage,
        );

        if (notifProductsResponse?.data) {
          setNotificationProducts(notifProductsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [notificationsPerPage]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        if (auth?.isLoggedIn) {
          const notificationsResponse = await fetchNotificationIds(
            auth.user.id,
          );

          if (notificationsResponse) {
            setNotifications(notificationsResponse);
          }
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getNotifications();
  }, [auth]);

  const handleIncreaseItemsPerPage = (e) => {
    e.preventDefault();

    if (e.target.id === "increase-favorites") {
      setFavoritesPerPage((prevPerPage) => prevPerPage + 3);
    } else if (e.target.id === "increase-notifications") {
      setNotificationsPerPage((prevPerPage) => prevPerPage + 3);
    }
  };

  const checkFavorite = (productId) => {
    if (auth?.isLoggedIn) {
      return favorites.length > 0 ? favorites.includes(productId) : false;
    }
    return false;
  };

  const checkNotification = (productId) => {
    if (auth?.isLoggedIn) {
      return notifications.length > 0 ? notifications.includes(productId) : false;
    }
    return false;
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <ItemGrid
          dealType="favorites"
          items={favoriteProducts}
          auth={auth}
          checkFavorite={checkFavorite}
          manageFavorites={manageFavorites}
          checkNotification={checkNotification}
          manageNotifications={manageNotifications}
          handleIncreaseItemsPerPage={handleIncreaseItemsPerPage}
        />
        <ItemGrid
          dealType="notifications"
          items={notificationProducts}
          auth={auth}
          checkFavorite={checkFavorite}
          manageFavorites={manageFavorites}
          checkNotification={checkNotification}
          manageNotifications={manageNotifications}
          handleIncreaseItemsPerPage={handleIncreaseItemsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default UserContent;
