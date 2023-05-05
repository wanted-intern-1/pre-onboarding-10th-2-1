import { CSKeyword } from './const/keyword';

export const handleSliceData = (data: [] | any) => {
  return data.slice(0, CSKeyword.MAX_LEN);
};
