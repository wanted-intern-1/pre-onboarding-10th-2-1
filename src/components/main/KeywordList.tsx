import { IKeyword} from 'src/types/keyword'
import styled from 'styled-components'

type Props ={
  keywordInfo: Array<IKeyword>
}

//TODO: 규격만짜놨음 api연동해야함
const KeywordList = ({keywordInfo}:Props) => {

  return (
    <S.Container>
      <S.SearchWrap>
        {
          keywordInfo && keywordInfo.map(keyword=>{
            return(
              <S.SearchItem>
                {keyword.name}
              </S.SearchItem>
            )
          })
        }
      </S.SearchWrap>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    padding: 15px 10px;
    background-color: #fff;
  `,
  SearchWrap: styled.ul`
    
  `,
  SearchItem: styled.li`
    
  `
}

export default KeywordList