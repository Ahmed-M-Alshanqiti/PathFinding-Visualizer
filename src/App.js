import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage";
function App() {
    return (_jsxs("div", { className: "w-full h-full  ", children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/dijkstra", element: _jsx(MainPage, { algo: "dijkstra" }) }), _jsx(Route, {}), _jsx(Route, {})] })] }));
}
export default App;
