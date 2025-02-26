import { useEffect } from "react";
// import { MdDarkMode } from "react-icons/md";
// import { CiLight } from "react-icons/ci";
import { useState } from "react";
import { Link } from "react-router-dom";
function Header() {
  const [theme, setTheme] = useState(localStorage.theme || "light");
  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.theme = newTheme;
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Function to apply the current theme
  const applyTheme = (theme: string) => {
    if (
      theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Apply the theme on component mount
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div className="bg-gray-100 dark:white w-full h-20 flex justify-around items-center  flex-row-reverse">
      <button
        className="w-12 h-12  shadow-2xl shadow-gray-800 dark:bg-gray-200 flex justify-center items-center"
        onClick={toggleTheme}
      >
        {theme === "light"
          ? //   <MdDarkMode className="w-full h-8" />
            "🌑"
          : //   <CiLight className="w-full h-8" />
            "🌞"}
      </button>
      <div className="w-1/2 h-full  flex justify-around items-center ">
        <button className="bg-gray-200 w-20 h-14 shadow-2xl flex hover:cursor-pointer">
          <Link to={"/dijkstra"}>dijkstra Algorithm</Link>
        </button>
        <button className="bg-gray-200 w-20 h-14 shadow-2xl flex hover:cursor-pointer">
          A* Algorithm
        </button>
        <button className="bg-gray-200 w-20 h-14 shadow-2xl flex hover:cursor-pointer">
          bfs Algorithm
        </button>
        <button className="bg-gray-200 w-20 h-14 shadow-2xl flex hover:cursor-pointer">
          dfs algorithm
        </button>
      </div>
    </div>
  );
}

export default Header;
