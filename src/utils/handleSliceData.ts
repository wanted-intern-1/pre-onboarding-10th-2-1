import { MAX_LEN } from "./const/keyword";

export const handleSliceData = (data:[] | any)=>{
  return data.slice(0,MAX_LEN);
}