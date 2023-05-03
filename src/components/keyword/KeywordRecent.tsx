import React from 'react'
import CMContainer from '../common/CMContainer'
import styled from 'styled-components'
import { RECENT_KEY } from 'src/utils/const/keyword';
import CMNoticeLIne from '../common/CMNoticeLIne';

const KeywordRecent = ({setIsClick}:{setIsClick:React.Dispatch<React.SetStateAction<boolean>>}) => {

  const recentDatas = JSON.parse(localStorage.getItem(RECENT_KEY)||"[]");
  return (
    <CMContainer>
      <S.SearchWrap>
        <CMNoticeLIne>최근 검색어</CMNoticeLIne>
        {
          recentDatas.length>0 ? recentDatas.map((recent:string)=>{
            return(
              <S.SearchItem onClick={()=>setIsClick(prev=>!prev)}>
                {recent}
              </S.SearchItem>
            )
          }):
          <CMNoticeLIne color={"#A7AFB7"}>최근 검색어가 없습니다.</CMNoticeLIne>
        }
      </S.SearchWrap>
    </CMContainer>
  )
}

const S = {
  SearchWrap: styled.ul`
  `,
  SearchItem: styled.li`
  padding:10px 20px;
  font-weight:bold;
  cursor: pointer;
  &:hover{
    background-color: rgba(0,0,0,0.1);
  }
  `,
}

export default KeywordRecent