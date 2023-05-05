import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import useOutsideClick from 'src/hooks/useOutsideClick';
import KeywordInput from './KeywordInput';
import KeywordList from './KeywordList';
import { IKeyword } from 'src/types/keyword';
import { handleSliceData } from 'src/utils/handleSliceData';
import keywordApi from 'src/api/keyword';

const KeywordMain = () => {
  const [keyword, setKeyword] = useState('');
  const [selectIndex, setSelectIndex] = useState(-1);

  const [isClick, setIsClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<IKeyword[]>([]);
  const keywordRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    async (keyword: string) => {
      const data = await keywordApi.fetchData(keyword);
      setKeywords(handleSliceData(data));
      setIsLoading(false);
    },
    [setKeyword]
  );

  useOutsideClick(keywordRef, () => {
    setIsClick(false);
    setSelectIndex(-1);
  });

  return (
    <S.Container ref={keywordRef}>
      <KeywordInput
        keyword={keyword}
        selectIndex={selectIndex}
        keywords={keywords}
        isClick={isClick}
        isLoading={isLoading}
        setKeyword={setKeyword}
        setSelectIndex={setSelectIndex}
        setIsClick={setIsClick}
        setIsLoading={setIsLoading}
        handleSearch={handleSearch}
        ref={inputRef}
      />
      <KeywordList
        keyword={keyword}
        selectIndex={selectIndex}
        keywords={keywords}
        isClick={isClick}
        isLoading={isLoading}
        setKeyword={setKeyword}
        setIsClick={setIsClick}
        setSelectIndex={setSelectIndex}
        handleSearch={handleSearch}
        inputRef={inputRef}
      />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    position: relative;
  `,
};

export default KeywordMain;
