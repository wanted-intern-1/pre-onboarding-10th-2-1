import { IKeyword} from 'src/types/keyword'
import styled from 'styled-components'
import CMContainer from 'src/components/common/CMContainer'

type Props ={
  keyword:string
  keywordInfo: Array<IKeyword>
}

const KeywordList = ({keyword,keywordInfo}:Props) => {
  
  return (
    <CMContainer>
        <KeywordLine>
          {keyword}
        </KeywordLine>
        <S.SearchWrap>
          {
            keywordInfo.length > 0 ? 
            <>
              <RecommnedLine>추천 검색어</RecommnedLine>
              {keywordInfo.map((keywordItem) => (
                <S.SearchItem>{keywordItem.name}</S.SearchItem>
              ))}
            </>
            :
            <S.SearchItem>
              검색어가 없습니다.
            </S.SearchItem>
          }
        </S.SearchWrap>
    </CMContainer>
  )
}

const KeywordLine = styled.div`
  margin-top:20px;
  padding:10px 20px;
  cursor: pointer;
    &:hover{
      background-color: rgba(0,0,0,0.1);
  }
`

const RecommnedLine = styled.div`
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

export default KeywordList