import Area from "@/components/Area";
import React from "react";

const Home = () => {
  return (
    <div className="w-full p-4 min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-7xl font-bold">ASV</h1>
        <p className="text-3xl mt-4">Algorithms Sorting Visualizer</p>
        <div className="w-full mt-10 min-h-screen">
          <Area />
        </div>
      </div>
    </div>
  );
};

export default Home;
