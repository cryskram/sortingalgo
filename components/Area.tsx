"use client";

import {
  bubbleSort,
  insertionSort,
  quickSort,
  selectionSort,
} from "@/utils/algos";
import React, { useEffect, useState } from "react";

const Area = () => {
  const [values, setValues] = useState<number[]>([]);
  const [selectedAlgo, setSelectedAlgo] = useState<string | null>(null);

  const handleRefresh = () => {
    const data = Array.from(
      { length: 100 },
      () => Math.floor(Math.random() * (500 - 10 + 1)) + 10
    );

    setValues(data);
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const maxValue = Math.max(...values);
  const maxHeight = 300;

  return (
    <div className="flex flex-col items-center">
      <select
        name="algo"
        id="algo"
        className="p-4 text-xl rounded bg-white text-black outline-none"
        onChange={(e) => setSelectedAlgo(e.target.value)}
      >
        <option selected disabled>
          Select an algorithm
        </option>
        <option value="bubble">Bubble Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="quick">Selection Sort</option>
      </select>

      <div className="bg-areaColor p-4 rounded-2xl h-full overflow-x-auto w-full mt-10">
        <div className="flex items-end space-x-1 h-[300px]">
          {values.map((value, idx) => {
            const height = (value / maxValue) * maxHeight;
            return (
              <div
                key={idx}
                className="bg-barColor w-full rounded"
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>
      </div>
      <div className="flex gap-4 mt-10">
        <button
          onClick={handleRefresh}
          className="px-4 py-2 text-2xl bg-mYellow shadow-2xl text-black rounded-xl"
        >
          Refresh
        </button>
        <button
          onClick={() => {
            if (selectedAlgo === "bubble") bubbleSort(values, setValues, 0.1);
            else if (selectedAlgo === "quick") quickSort(values, setValues, 10);
            else if (selectedAlgo === "insertion")
              insertionSort(values, setValues, 10);
            else if (selectedAlgo === "selection")
              selectionSort(values, setValues, 10);
            else console.log("Please select an algorithm");
          }}
          disabled={!selectedAlgo}
          className="px-4 py-2 text-2xl bg-mGreen shadow-2xl text-black rounded-xl"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Area;
