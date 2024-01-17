import { useState, useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

import "./darkModeToggle-styles.scss";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("DARK_MODE")) || false
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("DARK_MODE", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleModeChange = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className="dark-mode-toggle" onClick={handleModeChange}>
      {darkMode ? (
        <MdOutlineLightMode fontSize="1.25em" />
      ) : (
        <MdOutlineDarkMode fontSize="1.25em" />
      )}
    </div>
  );
}

export default DarkModeToggle;
