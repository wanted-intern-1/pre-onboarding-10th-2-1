import { keyboards } from "./const/keyboard";

type Props ={
  ref: React.MutableRefObject<HTMLInputElement | null>
  event: React.KeyboardEvent
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  index: number
}

export const handleKeyPress = ({ref,event,setIndex,index}:Props) => {

  if(event.key === keyboards.DOWN){
    setIndex(prev=>prev + 1);
    if (ref.current?.childElementCount === index + 1) setIndex(0);
  }

  if(event.key ===  keyboards.UP){
    setIndex(prev=>prev - 1);
  }
}