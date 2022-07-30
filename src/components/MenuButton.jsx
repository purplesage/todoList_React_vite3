import React, { useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { appDataContext } from "../context/DataContext";

function MenuButton({ className }) {
  const { isMobileNav, setIsMobileNav } = useContext(appDataContext);

  return (
    <button onClick={() => setIsMobileNav(!isMobileNav)} className={className}>
      {isMobileNav ? <FiMenu /> : <CgClose />}
    </button>
  );
}

export default MenuButton;
