import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Grid from "../components/grid/Grid";
const MainPage = (algo) => {
    return (_jsxs("div", { className: "flex justify-center items-center flex-col", children: ["the dijkstra algorithm", _jsx(Grid, { algo: `${algo}` })] }));
};
export default MainPage;
