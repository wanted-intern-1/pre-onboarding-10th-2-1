import { IKeyword } from 'src/types/keyword';
import styled from 'styled-components';
import CMContainer from 'src/components/common/CMContainer';
import { useCallback, useEffect, useRef, useState } from 'react';
import CMNoticeLIne from '../common/CMNoticeLIne';
import KeywordRecent from './KeywordRecent';
import keywordApi from 'src/api/keyword';
import { useDebounce } from 'src/hooks/useDebounce';
import KeywordInput from './KeywordInput';
import { handleSliceData } from 'src/utils/handleSliceData';

type Props = {
  isClick: boolean;
  selectIndex: number;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectIndex: React.Dispatch<React.SetStateAction<number>>;
};

const KeywordList = ({ isClick, selectIndex, setIsClick, setSelectIndex }: Props) => {
  const autoRef = useRef<HTMLUListElement>(null);
  const [keyword, setKeyword] = useState('');
  const [keywordInfo, setkeywordInfo] = useState<Array<IKeyword>>([]);

  const debounceKeyword = useDebounce(keyword);

  const handleSearchKeywords = useCallback(
    async (keyword: string) => {
      const data = await keywordApi.fetchData(keyword);
      setkeywordInfo(handleSliceData(data));
    },
    [setKeyword]
  );

  useEffect(() => {
    handleSearchKeywords(debounceKeyword);
  }, [debounceKeyword]);

  return (
    <>
      <KeywordInput
        keyword={keyword}
        setKeyword={setKeyword}
        selectIndex={selectIndex}
        keywords={keywordInfo}
        isClick={isClick}
        setIsClick={setIsClick}
        setSelectIndex={setSelectIndex}
        refetch={handleSearchKeywords}
      />
      {keyword && isClick && (
        <CMContainer>
          <>
            <S.SearchWrap ref={autoRef}>
              <S.SearchItem focus={selectIndex === 0} onClick={() => {}}>
                {keyword}
              </S.SearchItem>
              {keywordInfo.length > 0 ? (
                <>
                  <CMNoticeLIne>추천 검색어</CMNoticeLIne>
                  {keywordInfo.map((keywordItem, idx) => (
                    <S.SearchItem focus={selectIndex === idx + 1}>{keywordItem.name}</S.SearchItem>
                  ))}
                </>
              ) : (
                <CMNoticeLIne>검색어가 없습니다.</CMNoticeLIne>
              )}
            </S.SearchWrap>
          </>
        </CMContainer>
      )}
      {!keyword && isClick && <KeywordRecent setIsClick={setIsClick} selectIndex={selectIndex} />}
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
};

export default KeywordList;
