import { CSKeyword } from './const/keyword';

export const isExpired = (cachedAt: string | null) => {
  if (!cachedAt) return true;
  return new Date(cachedAt).getTime() + CSKeyword.EXPIRE_TIME < new Date().getTime();
};
