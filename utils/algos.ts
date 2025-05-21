export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const bubbleSort = async (
  array: number[],
  setValues: (values: number[]) => void,
  delay: number
) => {
  const arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setValues([...arr]);
        await sleep(delay);
      }
    }
  }
};

export const quickSort = async (
  array: number[],
  setValues: (values: number[]) => void,
  delay: number
) => {
  const arr = [...array];

  const partition = async (low: number, high: number): Promise<number> => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setValues([...arr]);
        await sleep(delay);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setValues([...arr]);
    await sleep(delay);
    return i + 1;
  };

  const sort = async (low: number, high: number) => {
    if (low < high) {
      const pi = await partition(low, high);
      await sort(low, pi - 1);
      await sort(pi + 1, high);
    }
  };

  await sort(0, arr.length - 1);
};

export const selectionSort = async (
  arr: number[],
  setValues: (values: number[]) => void,
  delay: number
) => {
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setValues([...arr]);
      await sleep(delay);
    }
  }
};

export const insertionSort = async (
  arr: number[],
  setValues: (values: number[]) => void,
  delay: number
) => {
  const values = [...arr];
  const n = values.length;

  for (let i = 1; i < n; i++) {
    const key = values[i];
    let j = i - 1;

    while (j >= 0 && values[j] > key) {
      values[j + 1] = values[j];
      j--;

      setValues([...values]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    values[j + 1] = key;
    setValues([...values]);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

export const mergeSort = async (
  array: number[],
  setValues: (values: number[]) => void,
  delay: number
) => {
  const arr = [...array];

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const merge = async (left: number, mid: number, right: number) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      setValues([...arr]);
      await sleep(delay);
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      setValues([...arr]);
      await sleep(delay);
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      setValues([...arr]);
      await sleep(delay);
    }
  };

  const sort = async (left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await sort(left, mid);
      await sort(mid + 1, right);
      await merge(left, mid, right);
    }
  };

  await sort(0, arr.length - 1);
};
