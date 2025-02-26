import React from "react";
import Grid from "../components/grid/Grid";

const MainPage: React.FC<MyComponentProps> = (algo) => {
  return (
    <div className="flex justify-center items-center flex-col">
      the dijkstra algorithm
      <Grid algo={`${algo}`} />
    </div>
  );
};

export default MainPage;
