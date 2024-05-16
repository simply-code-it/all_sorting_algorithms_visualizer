import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [array, setArray] = useState([]);

  // Generate a new random array
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < 50; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 5);
    }
    setArray(newArray);
  };

  // Bubble Sort algorithm with delay
  const bubbleSort = () => {
    const newArray = [...array];
    let delay = 10; // Delay in milliseconds

    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        setTimeout(()=> {
          if (newArray[j] > newArray[j + 1]) {
            const temp = newArray[j];
            newArray[j] = newArray[j + 1];
            newArray[j + 1] = temp;
            // Update state with the sorted array at each step
            setArray([...newArray]);
          }
        }, delay*(i*newArray.length+j));  // calculate delay based on iteration
        
      }
    }
  };

  // Insertion Sort algorithm with delay
  const insertionSort = () => {
    const newArray = [...array];
    let delay = 10; // Delay in milliseconds

    for (let i = 1; i < newArray.length; i++) {
      const key = newArray[i];
      let j = i - 1;
      setTimeout(() => {
        while (j >= 0 && newArray[j] > key) {
          newArray[j + 1] = newArray[j];
          j = j - 1;
          // Update state with the sorted array at each step
          setArray([...newArray]);
        }
        newArray[j + 1] = key;
        // Update state with the sorted array at each step
        setArray([...newArray]);
      }, delay * i); // Calculate delay based on iteration
    }
  };

  // Merge Sort algorithm with delay
  const mergeSort = () => {
    const newArray = [...array];

    const merge = (arr, l, m, r) => {
      const n1 = m - l + 1;
      const n2 = r - m;
      const L = new Array(n1);
      const R = new Array(n2);

      for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
      }
      for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
      }

      let i = 0,
        j = 0,
        k = l;
      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        k++;
      }

      while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
      }

      while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
      }
    };

    const mergeSortUtil = (arr, l, r) => {
      if (l >= r) {
        return;
      }
      const m = Math.floor((l + r) / 2);
      mergeSortUtil(arr, l, m);
      mergeSortUtil(arr, m + 1, r);
      merge(arr, l, m, r);
      // Update state with the sorted array after each merge
      setArray([...arr]);
    };

    // Delayed execution of mergeSortUtil
    const mergeSortDelayed = (arr, l, r) => {
      if (l < r) {
        const m = Math.floor((l + r) / 2);
        mergeSortDelayed(arr, l, m);
        mergeSortDelayed(arr, m + 1, r);
        setTimeout(() => {
          mergeSortUtil(arr, l, r);
        }, 30 * (r - l + 1)); // Adjust delay based on the size of the subarray
      }
    };

    mergeSortDelayed(newArray, 0, newArray.length - 1);
  };

  // Quicksort algorithm with delay
  const quickSort = () => {
    const newArray = [...array];

    const partition = (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      return i + 1;
    };

    const quickSortUtil = (arr, low, high) => {
      if (low < high) {
        const pi = partition(arr, low, high);
        setArray([...arr]); // Update state after each partition
        setTimeout(() => {
          quickSortUtil(arr, low, pi - 1);
          quickSortUtil(arr, pi + 1, high);
        }, 500); // Delay between each partition
      }
    };

    quickSortUtil(newArray, 0, newArray.length - 1);
  };

  // Selection Sort algorithm with delay
  const selectionSort = () => {
    const newArray = [...array];
    let delay = 10; // Delay in milliseconds

    for (let i = 0; i < newArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < newArray.length; j++) {
        setTimeout(() => {
          if (newArray[j] < newArray[minIndex]) {
            minIndex = j;
          }
        }, delay * (i * newArray.length + j)); // Calculate delay based on iteration
      }
      setTimeout(() => {
        const temp = newArray[i];
        newArray[i] = newArray[minIndex];
        newArray[minIndex] = temp;
        // Update state with the sorted array at each step
        setArray([...newArray]);
      }, delay * (i * newArray.length + newArray.length)); // Calculate delay for swapping
    }
  };

  return (
    <div id="mainContainer">
      <div className="array-container">
        {array.map((value, index) => (
          <div
            className="array-bar"
            key={index}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={generateArray}>Generate New Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={selectionSort}>Selection Sort</button>
        <button onClick={insertionSort}>Insertion Sort</button>
        <button onClick={mergeSort}>Merge Sort</button>
        <button onClick={quickSort}>Quick Sort</button>
      </div>
    </div>
  );
};

export default App;

