import React from 'react';

const debounce = (callback: React.Dispatch<React.SetStateAction<string>>) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const dispatchDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      callback(e.target.value);
    }, 300);
    timer = newTimer;
  };
  return dispatchDebounce;
};

export default debounce;
