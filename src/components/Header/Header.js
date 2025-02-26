import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const applyTheme = (theme) => {
        if (theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    };
    // Apply the theme on component mount
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);
    return (_jsxs("div", { className: "bg-gray-100 dark:white w-full h-20 flex justify-around items-center  flex-row-reverse", children: [_jsx("button", { className: "w-12 h-12  shadow-2xl shadow-gray-800 dark:bg-gray-200 flex justify-center items-center", onClick: toggleTheme, children: theme === "light"
                    ? //   <MdDarkMode className="w-full h-8" />
                        "🌑"
                    : //   <CiLight className="w-full h-8" />
                        "🌞" }), _jsxs("div", { className: "w-1/2 h-full  flex justify-around items-center ", children: [_jsx("button", { className: "bg-gray-200 w-20 h-14 shadow-2xl flex hover:cursor-pointer", children: _jsx(Link, { to: "/dijkstra", children: "dijkstra Algorithm" }) }), _jsx("button", { className: "bg-gray-200 w-20 h-14 shadow-2xl flex hover:cursor-pointer", children: "A* Algorithm" }), _jsx("button", { className: "bg-gray-200 w-20 h-14 shadow-2xl flex hover:cursor-pointer", children: "bfs Algorithm" }), _jsx("button", { className: "bg-gray-200 w-20 h-14 shadow-2xl flex hover:cursor-pointer", children: "dfs algorithm" })] })] }));
}
export default Header;
