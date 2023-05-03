import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {AiOutlineSearch} from 'react-icons/ai';
import {MdCancel} from 'react-icons/md';
import useOutsideClick from 'src/hooks/useOutsideClick';

type Props ={
  keyword: string | undefined
  setKeyword : React.Dispatch<React.SetStateAction<string>>
}

const KeywordInput = ({ keyword, setKeyword }: Props) => {

  const keywordInputRef = useRef<HTMLInputElement>(null);
  const [isClick,setIsClick] = useState(false);


  const onCancleBtn = (e:React.MouseEvent)=>{
    e.stopPropagation();
    setKeyword("");
  }

  useOutsideClick(keywordInputRef,()=>setIsClick(false))

  return (
    <S.Box isClick={isClick}>
      <S.Line ref={keywordInputRef} onClick={()=>setIsClick(true)}>
        {
          (!isClick && !keyword) &&
          <NoticeWrap>
            <S.SearchInputIcon/>
            <S.Notice>질환명을 입력해 주세요</S.Notice>
          </NoticeWrap>
        }
        <S.SearchInputWrap>
          <S.SearchInput value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
          <S.SearchInputCancleIcon isClick={isClick} onClick={onCancleBtn} color='#A7AFB7' />
        </S.SearchInputWrap>
      </S.Line>
      <S.SubmItBtn>
        <S.SearchIcon color='#fff' />
      </S.SubmItBtn>
    </S.Box>
  )
}

const NoticeWrap = styled.div<{isClick?:boolean}>`
  top:50%;
  position:absolute;
  transform: translateY(-50%);
  display: flex;
  align-items:center;
  color: #A7AFB7;
  pointer-events:none;
  font-weight:700;
`

const S = {
  Box: styled.div<{isClick?:boolean}>`
    display:flex;
    justify-content: space-between;
    padding: 10px 20px;
    border-radius:42px;
    border: 2px solid #fff;
    background-color: #fff;
    width:100%;
    border-color: ${({isClick})=>isClick ? "rgb(25, 118, 210)" :"#fff"} ;
  `,
  Line: styled.div`
    width:100%;
    position:relative;
    display:flex;
    justify-content:space-between;
    margin-right:10px;
  `,
  SubmItBtn: styled.button`
    width:48px;
    height:48px;
    border-radius: 50%;
    background-color: #007BE9;
    border:none;
  `,
  SearchIcon: styled(AiOutlineSearch)`
    width:28px;
    height:28px;
  `,
  SearchInputIcon: styled(AiOutlineSearch)`
    & > path {
      fill: "#A7AFB7";
    }
    width:25px;
    height:25px;
  `,
  Notice: styled.div`
    margin-left:10px;
  `,
  SearchInputCancleIcon: styled(MdCancel)<{isClick:boolean}>`
    display: ${({isClick})=>isClick ? "block":"none"};
    width:25px;
    height:25px;
    cursor: pointer;
  `,
    SearchInput: styled.input`
    font-size:20px;
    outline:none;
    border:none;
    flex:1;
  `,
  SearchInputWrap: styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
  `
}

export default KeywordInput