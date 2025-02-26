import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="w-full h-full  ">
      <Header />
      <Routes>
        <Route path="/dijkstra" element={<MainPage algo={"dijkstra"} />} />
        <Route />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
