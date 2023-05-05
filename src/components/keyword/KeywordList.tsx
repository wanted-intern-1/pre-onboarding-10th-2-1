import { IKeyword } from 'src/types/keyword';
import styled from 'styled-components';
import CMContainer from 'src/components/common/CMContainer';
import { useContext, useEffect, useRef } from 'react';
import CMNoticeLIne from '../common/CMNoticeLIne';
import KeywordRecent from './KeywordRecent';
import { highlight } from 'src/utils/highlight';
import { KeywordContext } from './KeywordMain';
import { useDebounce } from 'src/hooks/useDebounce';

type Props = {
  keywords: IKeyword[];
  isClick: boolean;
  isLoading: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (keyword: string) => Promise<void>;
};

const KeywordList = ({ keywords, isClick, isLoading, setIsClick, handleSearch }: Props) => {
  const { keyword, selectIndex } = useContext(KeywordContext);
  const autoRef = useRef<HTMLUListElement>(null);
  const debounceKeyword = useDebounce(keyword);

  return (
    <>
      {keyword && keywords && isClick && (
        <CMContainer>
          <>
            <S.SearchWrap ref={autoRef}>
              <S.SearchItem focus={selectIndex === 0} onClick={() => {}}>
                {keyword}
              </S.SearchItem>
              {keywords.length > 0 ? (
                <>
                  <CMNoticeLIne>추천 검색어</CMNoticeLIne>
                  {keywords.map((keywordItem, idx) => (
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
