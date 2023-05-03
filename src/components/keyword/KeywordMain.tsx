import React, { useEffect, useState } from 'react'
import KeywordInput from './KeywordInput'
import KeywordList from './KeywordList'
import { IKeyword } from 'src/types/keyword'
import keywordApi from 'src/api/keyword'
import { useDebounce } from 'src/hooks/useDebounce'
import styled from 'styled-components'
import KeywordRecent from './KeywordRecent'
import { isExpired } from 'src/utils/isExpired'

const KeywordMain = () => {

  const {fetchKeyword} = keywordApi
  const [keyword,setKeyword] = useState("");
  const [keywordInfo,setkeywordInfo] = useState<Array<IKeyword>>();
  const [isClick,setIsClick] = useState(false);

  const debounceKeyword = useDebounce(keyword);

  const handleSearchKeywords = async (keyword:string)=>{
    
    const rememberKeyword = localStorage.getItem(keyword);
    
    if(rememberKeyword){
      const parseData = JSON.parse(rememberKeyword);
      if (isExpired(parseData.expiry)) setkeywordInfo(parseData)
      return
    }

    const data = await fetchKeyword(keyword);
    setkeywordInfo(data);
    handleSaveCashe(data);
  }

  const handleSaveCashe = (data:Array<IKeyword>)=>{
    const now = new Date();
    const casheData = JSON.stringify([...data,{expiry:now.getTime()}]);
    
    localStorage.setItem(keyword,casheData);
  }

  useEffect(()=>{
    handleSearchKeywords(debounceKeyword);
  },[debounceKeyword])


  return (
    <S.Container>
      <KeywordInput isClick={isClick} setIsClick={setIsClick} keyword={keyword} setKeyword={setKeyword} />
      {
        (keyword && keywordInfo && isClick) && <KeywordList keyword={keyword} keywordInfo={keywordInfo} />
      }
      {
        (!keyword && isClick) && <KeywordRecent/>
      }
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    width:100%;
    position:relative;
  `
}

export default KeywordMain