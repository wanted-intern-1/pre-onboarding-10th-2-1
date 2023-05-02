import React from 'react'
import { ISearch } from 'src/types/search'
import styled from 'styled-components'

type Props ={
  searchInfo: Array<ISearch>
}

//TODO: 규격만짜놨음 api연동해야함
const SearchList = ({searchInfo}:Props) => {
  return (
    <S.Container>
      <S.SearchWrap>
        {
          searchInfo && searchInfo.map(search=>{
            return(
              <S.SearchItem>
                {search.name}
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

export default SearchList