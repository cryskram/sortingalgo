"use client";

import {
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
} from "@/utils/algos";
import React, { useEffect, useRef, useState } from "react";

const Area = () => {
  const [values, setValues] = useState<number[]>([]);
  const [selectedAlgo, setSelectedAlgo] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleRefresh = () => {
    const data = Array.from(
      { length: size || 100 },
      () => Math.floor(Math.random() * ((size || 100) - 10 + 1)) + 10
    );

    setValues(data);
    setElapsedTime(0);
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const startTimer = () => {
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const seconds = (now - start) / 1000;
      setElapsedTime(parseFloat(seconds.toFixed(3)));
    }, 10);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleStart = async () => {
    if (!selectedAlgo) {
      console.log("Please select an algorithm");
      return;
    }

    startTimer();

    if (selectedAlgo === "bubble") {
      await bubbleSort(values, setValues, 10);
    } else if (selectedAlgo === "quick") {
      await quickSort(values, setValues, 10);
    } else if (selectedAlgo === "insertion") {
      await insertionSort(values, setValues, 10);
    } else if (selectedAlgo === "selection") {
      await selectionSort(values, setValues, 10);
    } else if (selectedAlgo === "merge") {
      await mergeSort(values, setValues, 10);
    }

    stopTimer();
  };

  const maxValue = Math.max(...values);
  const maxHeight = 500;

  return (
    <div className="flex flex-col items-center">
      <input
        className="p-2 text-xl rounded bg-white text-black outline-none"
        type="text"
        placeholder="Enter the size(0-350)"
        id="size"
        name="size"
        value={size || 0}
        onChange={(e) => setSize(parseInt(e.target.value))}
      />

      <select
        name="algo"
        id="algo"
        className="p-2 text-xl rounded bg-white text-black outline-none mt-4"
        onChange={(e) => {
          setSelectedAlgo(e.target.value);
          handleRefresh();
        }}
        defaultValue=""
      >
        <option value="" disabled>
          Select an algorithm
        </option>
        <option value="bubble">Bubble Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="merge">Merge Sort</option>
      </select>

      <h1 className="mt-4 text-white text-xl">
        Time taken: {elapsedTime.toFixed(3)} sec
      </h1>

      <div className="bg-areaColor p-4 rounded-2xl h-full overflow-x-auto w-full mt-10">
        <div
          className="flex items-end space-x-1 h-[500px]"
          style={{ width: `${values.length * 10}px` }}
        >
          {values.map((value, idx) => {
            const height = (value / maxValue) * maxHeight;
            return (
              <div
                key={idx}
                className="bg-barColor rounded"
                style={{
                  height: `${height}px`,
                  width: "8px",
                }}
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
          onClick={handleStart}
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
