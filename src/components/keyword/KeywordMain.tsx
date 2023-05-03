import React, { useEffect, useState } from 'react'
import KeywordInput from './KeywordInput'
import KeywordList from './KeywordList'
import { IKeyword } from 'src/types/keyword'
import keywordApi from 'src/api/keyword'
import { useDebounce } from 'src/hooks/useDebounce'

const KeywordMain = () => {

  const {fetchKeyword} = keywordApi
  const [keyword,setKeyword] = useState("");
  const [keywordInfo,setkeywordInfo] = useState<Array<IKeyword>>();
  
  const debounceKeyword = useDebounce(keyword);

  const handleSearchKeywords = async (keyword:string)=>{
    const data = await fetchKeyword(keyword);
    setkeywordInfo(data);
  }

  useEffect(()=>{
    handleSearchKeywords(debounceKeyword);
  },[debounceKeyword])


  return (
    <div>
      <KeywordInput keyword={keyword} setKeyword={setKeyword} />
      {
        keywordInfo && <KeywordList keywordInfo={keywordInfo} />
      }
    </div>
  )
}

export default KeywordMain