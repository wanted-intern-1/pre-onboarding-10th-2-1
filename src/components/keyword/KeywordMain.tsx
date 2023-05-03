import React, { useCallback, useEffect, useRef, useState } from 'react'
import KeywordInput from './KeywordInput'
import KeywordList from './KeywordList'
import { IKeyword } from 'src/types/keyword'
import keywordApi from 'src/api/keyword'
import { useDebounce } from 'src/hooks/useDebounce'
import styled from 'styled-components'
import KeywordRecent from 'src/components/keyword/KeywordRecent'
import { isExpired } from 'src/utils/isExpired'
import useOutsideClick from 'src/hooks/useOutsideClick'

const KeywordMain = () => {

  const {fetchKeyword} = keywordApi
  const [keyword,setKeyword] = useState("");
  const [keywordInfo,setkeywordInfo] = useState<Array<IKeyword>>();
  const [isClick,setIsClick] = useState(false);
  const keywordRef = useRef<HTMLInputElement>(null);


  const debounceKeyword = useDebounce(keyword);

  const handleSearchKeywords = useCallback(async (keyword:string)=>{
    
    const rememberKeyword = localStorage.getItem(keyword);
    
    if(rememberKeyword){
      const parseData = JSON.parse(rememberKeyword);
      if (isExpired(parseData.expiry)) {
        handleNewData(keyword)
        return
      }
      setkeywordInfo(parseData)
      return
    }

    handleNewData(keyword)
    
  },[setKeyword])  
  
  const handleNewData = async (keyword:string)=>{
    const data = await fetchKeyword(keyword);
    setkeywordInfo(data)
    handleSaveCashe(keyword,data);
  }

  const handleSaveCashe = (keyword:string,data:Array<IKeyword>)=>{
    if(data.length>0){
      const now = new Date();
      const casheData = JSON.stringify([...data,{expiry:now.getTime()}]);
      
      localStorage.setItem(keyword,casheData);
    }
  }

  useEffect(()=>{
    handleSearchKeywords(debounceKeyword);
  },[debounceKeyword])

  useOutsideClick(keywordRef,()=>setIsClick(false))

  return (
    <S.Container ref={keywordRef}>
      <KeywordInput  refetch={handleSearchKeywords} isClick={isClick} setIsClick={setIsClick} keyword={keyword} setKeyword={setKeyword} />
      {
        (keyword && keywordInfo && isClick) && <KeywordList keyword={keyword} keywordInfo={keywordInfo} />
      }
      {
        (!keyword && isClick) && <KeywordRecent setIsClick={setIsClick} />
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