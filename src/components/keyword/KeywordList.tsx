import { IKeyword } from 'src/types/keyword';
import styled from 'styled-components';
import CMContainer from 'src/components/common/CMContainer';
import { useEffect, useRef, useState } from 'react';
import CMNoticeLIne from '../common/CMNoticeLIne';
import KeywordRecent from './KeywordRecent';
import keywordApi from 'src/api/keyword';
import { handleSliceData } from 'src/utils/handleSliceData';

type Props = {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  keyword: string;
  selectIndex: number;
  setSelectIndex: React.Dispatch<React.SetStateAction<number>>;
};

const KeywordList = ({ isClick, setIsClick, keyword, selectIndex, setSelectIndex }: Props) => {
  const autoRef = useRef<HTMLUListElement>(null);

  const [keywordInfo, setkeywordInfo] = useState<Array<IKeyword>>();

  const handleSearchKeywords = async (keyword: string) => {
    const data = await keywordApi.fetchData(keyword);
    setkeywordInfo(handleSliceData(data));
  };

  useEffect(() => {
    handleSearchKeywords(keyword);
    setSelectIndex(-1);
  }, [keyword]);

  return (
    <>
      {keyword && keywordInfo && isClick && (
        <CMContainer>
          <>
            <S.KeywordLine>{keyword}</S.KeywordLine>
            <S.SearchWrap ref={autoRef}>
              {keywordInfo.length > 0 ? (
                <>
                  <CMNoticeLIne>추천 검색어</CMNoticeLIne>
                  {keywordInfo.map((keywordItem, idx) => (
                    <S.SearchItem key={keywordItem.id} focus={selectIndex === idx}>{keywordItem.name}</S.SearchItem>
                  ))}
                </>
              ) : (
                <CMNoticeLIne>검색어가 없습니다.</CMNoticeLIne>
              )}
            </S.SearchWrap>
          </>
        </CMContainer>
      )}
      {!keyword && isClick && <KeywordRecent setIsClick={setIsClick} />}
    </>
  );
};

const S = {
  SearchWrap: styled.ul``,
  SearchItem: styled.li<{ focus: boolean }>`
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    background-color: ${({ focus }) => (focus ? 'rgba(0,0,0,0.1)' : '#fff')};
  `,
  KeywordLine: styled.div`
    margin-top: 10px;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `,
};

export default KeywordList;
