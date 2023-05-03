import React from 'react'
import styled from 'styled-components'
import KeywordMain from '../keyword/KeywordMain'

const Main = () => {
  
  return (
    <S.Container>
      <S.Wrap>
        <S.Title>
          국내 모든 임상시험 검색하고
          <br/>
          온라인으로 참여하기
        </S.Title>
      </S.Wrap>
      <S.KeywordWrap>
        <KeywordMain/>
      </S.KeywordWrap>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    width:100%;
    height:100%;
    background-color: #CAE9FF;
  `,
  Wrap: styled.div`
    max-width:1000px;
    margin: 0 auto;
    text-align:center;
    padding-top: 80px;
  `,
  Title: styled.h2`
    font-size: 2.125rem;
    font-weight: 700;
    margin-bottom:40px;
  `,
  KeywordWrap: styled.div`
    width:490px;
    margin:0 auto;
  `
}

export default Main