import React, { createContext, useState } from "react";

export const utilityContext = createContext({});

function UtilityContext({ children }) {
  //* content availability state.
  const [error, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //*mobile app version states
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [notificationDisplay, setNotificationDisplay] = useState(false);

  const handleNotificationAnimation = () => {
    setNotificationDisplay(true);

    setTimeout(() => {
      setNotificationDisplay(false);
    }, 4500);
  };

  return (
    <utilityContext.Provider
      value={{
        error,
        setIsError,
        isLoading,
        setIsLoading,
        isMobileNav,
        setIsMobileNav,
        notificationDisplay,
        handleNotificationAnimation,
      }}
    >
      {children}
    </utilityContext.Provider>
  );
}

export default UtilityContext;
