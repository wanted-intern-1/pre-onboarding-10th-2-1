import { CSKeyword } from 'src/utils/const/keyword';
import { handleSliceData } from 'src/utils/handleSliceData';

export const getRecentKeywords = () => {
  return JSON.parse(localStorage.getItem(CSKeyword.RECENT_KEY) || '[]');
};

export const addRecentKeyword = (recent: string) => {
  const recents = getRecentKeywords();
  const jsonRecents = JSON.stringify(
    handleSliceData([recent, ...recents.filter((e: string) => e !== recent)])
  );
  localStorage.setItem(CSKeyword.RECENT_KEY, jsonRecents);
};
