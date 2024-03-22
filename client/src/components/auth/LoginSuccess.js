import React, { useEffect } from "react";

const LoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return <div>You have Logged in</div>;
};

export default LoginSuccess;
