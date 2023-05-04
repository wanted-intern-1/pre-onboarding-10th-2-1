export const isExpired = (cachedAt: string | null) => {
  if (!cachedAt) return true;
  return new Date(cachedAt).getTime() + 3600000 < new Date().getTime();
};
