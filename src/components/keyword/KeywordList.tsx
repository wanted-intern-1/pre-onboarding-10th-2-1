import { IKeyword} from 'src/types/keyword'
import styled from 'styled-components'
import CMContainer from 'src/components/common/CMContainer'
import { useRef, useState } from 'react'
import CMNoticeLIne from '../common/CMNoticeLIne'

type Props ={
  keyword:string
  keywordInfo: Array<IKeyword>
}

const KeywordList = ({keyword,keywordInfo}:Props) => {

  const autoRef = useRef<HTMLUListElement>(null);
  const [index,setIndex] = useState<number>(-1);
  
  return (
    <CMContainer>
        <S.KeywordLine>
          {keyword}
        </S.KeywordLine>
        <S.SearchWrap ref={autoRef}>
          {
            keywordInfo.length > 0 ? 
            <>
              <CMNoticeLIne>추천 검색어</CMNoticeLIne>
              {keywordInfo.map((keywordItem) => (
                <S.SearchItem>{keywordItem.name}</S.SearchItem>
              ))}
            </>
            :
            <CMNoticeLIne>검색어가 없습니다.</CMNoticeLIne>
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
  KeywordLine: styled.div`
    margin-top:10px;
    padding:10px 20px;
    cursor: pointer;
    &:hover{
      background-color: rgba(0,0,0,0.1);
    }
  `,
}

export default KeywordList