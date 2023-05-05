import { IKeyword } from 'src/types/keyword';
import styled from 'styled-components';
import CMContainer from 'src/components/common/CMContainer';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import CMNoticeLIne from '../common/CMNoticeLIne';
import KeywordRecent from './KeywordRecent';
import keywordApi from 'src/api/keyword';
import { useDebounce } from 'src/hooks/useDebounce';
import KeywordInput from './KeywordInput';
import { handleSliceData } from 'src/utils/handleSliceData';
import { highlight } from 'src/utils/highlight';
import { KeywordContext } from './KeywordMain';

type Props = {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
};

const KeywordList = ({ isClick, setIsClick }: Props) => {
  const autoRef = useRef<HTMLUListElement>(null);
  const [keywordInfo, setkeywordInfo] = useState<Array<IKeyword>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { keyword, selectIndex, setKeyword } = useContext(KeywordContext);

  const debounceKeyword = useDebounce(keyword);

  const handleSearchKeywords = useCallback(
    async (keyword: string) => {
      const data = await keywordApi.fetchData(keyword);
      setkeywordInfo(handleSliceData(data));
      setIsLoading(false);
    },
    [setKeyword]
  );

  useEffect(() => {
    handleSearchKeywords(debounceKeyword);
  }, [debounceKeyword]);

  return (
    <>
      <KeywordInput
        keywords={keywordInfo}
        isClick={isClick}
        isLoading={isLoading}
        setIsClick={setIsClick}
        setIsLoading={setIsLoading}
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
                    <S.SearchItem
                      dangerouslySetInnerHTML={{
                        __html: highlight(keywordItem.name, debounceKeyword),
                      }}
                      focus={selectIndex === idx + 1}
                    />
                  ))}
                </>
              ) : isLoading ? (
                <CMNoticeLIne>검색 중...</CMNoticeLIne>
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
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    background-color: ${({ focus }) => (focus ? 'rgba(0,0,0,0.1)' : '#fff')};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    strong {
      font-weight: bold;
    }
  `,
};

export default KeywordList;
