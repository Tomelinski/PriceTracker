import React, { useEffect } from "react";

export default function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return <div>You have Logged in</div>;
}