import React, { useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { appDataContext } from "../context/DataContext";

function MenuButton({ className }) {
  const { navDisplay, setNavDisplay } = useContext(appDataContext);

  return (
    <button onClick={() => setNavDisplay(!navDisplay)} className={className}>
      <FiMenu />
    </button>
  );
}

export default MenuButton;
