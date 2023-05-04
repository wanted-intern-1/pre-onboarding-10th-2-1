export const isExpired = (expiryTime: number) => {
  const currentTime = new Date().getTime();
  const difference = currentTime - expiryTime;
  return difference >= 60 * 60 * 1000;
};
