import React, { useContext } from "react";
import { utilityContext } from "../context/UtilityContext";

import { FiMenu } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

function MenuButton({ className }) {
  const { isMobileNav, setIsMobileNav } = useContext(utilityContext);

  return (
    <button onClick={() => setIsMobileNav(!isMobileNav)} className={className}>
      {!isMobileNav ? <FiMenu /> : <CgClose />}
    </button>
  );
}

export default MenuButton;
