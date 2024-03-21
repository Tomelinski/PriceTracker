import React from "react";
import PropTypes from 'prop-types';
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const NotificationButton = ({
  product,
  auth,
  isNotification,
  manageNotifications,
}) => {
  const { id, price } = product;

  const isActiveNotificion = () => {
    if (auth?.isLoggedIn && isNotification) {
      return <NotificationsIcon />;
    }
    return <NotificationsNoneIcon />;
  };

  return (
    <IconButton
      aria-label="Notification"
      size="medium"
      onClick={() => auth?.isLoggedIn && manageNotifications(id, price)}
    >
      {isActiveNotificion()}
    </IconButton>
  );
};

NotificationButton.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  isNotification: PropTypes.bool.isRequired,
  manageNotifications: PropTypes.func.isRequired,
};

export default NotificationButton;
