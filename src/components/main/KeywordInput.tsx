import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {AiOutlineSearch} from 'react-icons/ai';
const KeywordInput = () => {

  const keywordInputRef = useRef<HTMLInputElement>(null);
  const [isClick,setIsClick] = useState(false);
  const [keyword,setKeyword] = useState("");

  const onClickBox = ()=>{
    setIsClick(prev=>!prev)
    if(keywordInputRef.current && isClick) {
      keywordInputRef.current.blur();
      setKeyword("");
    }
  }

  return (
    <S.Box isClick={isClick}>
      <S.Line onClick={onClickBox}>
        <NoticeWrap isClick={isClick}>
          <S.SearchInputIcon/>
          <S.Notice>질환명을 입력해 주세요</S.Notice>
        </NoticeWrap>
        <S.Input value={keyword} onChange={(e)=>setKeyword(e.target.value)} ref={keywordInputRef}/>
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
  display: ${({isClick})=>isClick ? "none" :"flex" } ;
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
    width:490px;
    margin:0 auto;
    border-color: ${({isClick})=>isClick ? "rgb(25, 118, 210)" :"#fff"} ;
  `,
  Line: styled.div`
    width:100%;
    position:relative;
    display:flex;
    justify-content:space-between;
  `,
  Input: styled.input`
    outline:none;
    border:none;
    width:100%;
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
  `
}

export default KeywordInput