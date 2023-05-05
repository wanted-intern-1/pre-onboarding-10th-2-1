import { IKeyword } from 'src/types/keyword';
import styled from 'styled-components';
import CMContainer from 'src/components/common/CMContainer';
import { useEffect, useRef } from 'react';
import CMNoticeLIne from '../common/CMNoticeLIne';
import KeywordRecent from './KeywordRecent';
import { highlight } from 'src/utils/highlight';
import { useDebounce } from 'src/hooks/useDebounce';
import { addRecentKeyword } from 'src/api/localStorage';

type Props = {
  keyword: string;
  selectIndex: number;
  keywords: IKeyword[];
  isClick: boolean;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectIndex: React.Dispatch<React.SetStateAction<number>>;
  handleSearch: (keyword: string) => Promise<void>;
};

const KeywordList = ({
  keyword,
  selectIndex,
  keywords,
  isClick,
  isLoading,
  inputRef,
  setKeyword,
  setIsClick,
  setSelectIndex,
  handleSearch,
}: Props) => {
  const autoRef = useRef<HTMLUListElement>(null);
  // TODO: debounce 수정
  const debounceKeyword = useDebounce(keyword);

  const handleKeywordClick = (recent: string) => {
    inputRef?.current?.blur();
    setIsClick(false);
    setSelectIndex(-1);
    addRecentKeyword(recent);
    setKeyword(recent);
  };

  useEffect(() => {
    handleSearch(debounceKeyword);
  }, [debounceKeyword]);

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
                      onClick={() => handleKeywordClick(keywordItem.name)}
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
      {!keyword && isClick && (
        <KeywordRecent selectIndex={selectIndex} handleKeywordClick={handleKeywordClick} />
      )}
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
