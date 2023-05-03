import React from 'react'
import CMContainer from '../common/CMContainer'
import styled from 'styled-components'
import { RECENT_KEY } from 'src/utils/const/keyword';

const KeywordRecent = () => {
  const recentDatas = JSON.parse(localStorage.getItem(RECENT_KEY)||"[]");
  console.log(recentDatas)
  return (
    <CMContainer>
      <S.SearchWrap>
        <RecentLine>
          최근 검색어
        </RecentLine>
        {
          recentDatas.length>0 ? recentDatas.map((recent:string)=>{
            return(
              <S.SearchItem>
                {recent}
              </S.SearchItem>
            )
          }):
          <S.SearchItem>최근 검색어가 없습니다.</S.SearchItem>
        }
      </S.SearchWrap>
    </CMContainer>
  )
}

const RecentLine = styled.div`
  font-size:12px;
  padding:10px 20px;
  font-weight:500;
`

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
`
}

export default KeywordRecent