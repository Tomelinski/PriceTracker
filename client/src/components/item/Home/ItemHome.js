import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import AuthContext from "../../../context/authContext";
import {
  createFavorite,
  deleteFavorite,
  createNotification,
  deleteNotification,
  fetchDealItems,
  fetchFavoriteIds,
  fetchNotificationIds,
} from "../../../api/Axios";
import { DEAL_LIMIT } from "../../../constants/Constants";
import { ItemGrid } from "../Grid";

const ItemHome = () => {
  const auth = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [webProducts, setWebProducts] = useState([]);
  const [inStoreProducts, setInStoreProducts] = useState([]);
  const [dealsPerPage, setDealsPerPage] = useState(DEAL_LIMIT);
  const [inStoresPerPage, setInStoresPerPage] = useState(DEAL_LIMIT);

  const manageFavorites = async (productId) => {
    try {
      if (auth?.isLoggedIn) {
        const isFavorited = favorites.includes(productId);

        if (isFavorited) {
          await deleteFavorite(auth.userData.id, productId);
        } else {
          await createFavorite(auth.userData.id, productId);
        }

        setFavorites((prevFavorites) => (isFavorited
          ? prevFavorites.filter((id) => id !== productId)
          : [...prevFavorites, productId]));
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  useEffect(() => {
    const getFavorites = async () => {
      try {
        if (auth?.isLoggedIn) {
          const favoritesResponse = await fetchFavoriteIds(auth.userData.id);

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

  const manageNotifications = async (productId, threshold) => {
    try {
      if (auth?.isLoggedIn) {
        const isActiveNotification = notifications.includes(productId);
        console.log(`active${isActiveNotification}`);

        if (isActiveNotification) {
          console.log(`delete${productId}`);
          await deleteNotification(auth.userData.id, productId);
        } else {
          console.log(`create${productId}`);
          await createNotification(auth.userData.id, productId, threshold);
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
    const getNotifications = async () => {
      try {
        if (auth?.isLoggedIn) {
          const notificationsResponse = await fetchNotificationIds(
            auth.userData.id,
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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const webProductsResponse = await fetchDealItems(false, dealsPerPage);

        if (webProductsResponse?.data) {
          setWebProducts(webProductsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [dealsPerPage]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const inStoreProductsResponse = await fetchDealItems(
          true,
          inStoresPerPage,
        );

        if (inStoreProductsResponse?.data) {
          setInStoreProducts(inStoreProductsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [inStoresPerPage]);

  const handleIncreaseItemsPerPage = (e) => {
    e.preventDefault();

    if (e.target.id === "increas-all") {
      setDealsPerPage((prevDealsPerPage) => prevDealsPerPage + 3);
    } else if (e.target.id === "increase-webOnly") {
      setDealsPerPage((prevDealsPerPage) => prevDealsPerPage + 3);
    } else if (e.target.id === "increase-inStoreOnly") {
      setInStoresPerPage((prevInStoresPerPage) => prevInStoresPerPage + 3);
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
          dealType="webOnly"
          items={webProducts}
          auth={auth}
          checkFavorite={checkFavorite}
          manageFavorites={manageFavorites}
          checkNotification={checkNotification}
          manageNotifications={manageNotifications}
          handleIncreaseItemsPerPage={handleIncreaseItemsPerPage}
        />
        <ItemGrid
          dealType="inStoreOnly"
          items={inStoreProducts}
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

export default ItemHome;
