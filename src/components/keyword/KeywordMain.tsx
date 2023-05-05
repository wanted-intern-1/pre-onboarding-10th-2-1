import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import useOutsideClick from 'src/hooks/useOutsideClick';
import KeywordInput from './KeywordInput';
import KeywordList from './KeywordList';
import { IKeyword } from 'src/types/keyword';
import { handleSliceData } from 'src/utils/handleSliceData';
import keywordApi from 'src/api/keyword';

type IKeywordContext = {
  keyword: string;
  selectIndex: number;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSelectIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const KeywordContext = React.createContext<IKeywordContext>({
  keyword: '',
  selectIndex: -1,
  setKeyword: () => {},
  setSelectIndex: () => {},
});

const KeywordMain = () => {
  const [keyword, setKeyword] = useState('');
  const [selectIndex, setSelectIndex] = useState(-1);

  const [isClick, setIsClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<IKeyword[]>([]);
  const keywordRef = useRef<HTMLInputElement>(null);

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
    <KeywordContext.Provider value={{ keyword, selectIndex, setSelectIndex, setKeyword }}>
      <S.Container ref={keywordRef}>
        <KeywordInput
          keywords={keywords}
          isClick={isClick}
          isLoading={isLoading}
          setIsClick={setIsClick}
          setIsLoading={setIsLoading}
          handleSearch={handleSearch}
        />
        <KeywordList
          keywords={keywords}
          isClick={isClick}
          isLoading={isLoading}
          setIsClick={setIsClick}
          handleSearch={handleSearch}
        />
      </S.Container>
    </KeywordContext.Provider>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    position: relative;
  `,
};

export default KeywordMain;
