import React, { useRef, useState } from 'react';
import KeywordList from './KeywordList';
import styled from 'styled-components';
import useOutsideClick from 'src/hooks/useOutsideClick';

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
  const [selectIndex, setSelectIndex] = useState(-1);
  const [keyword, setKeyword] = useState('');
  const keywordRef = useRef<HTMLInputElement>(null);

  const [isClick, setIsClick] = useState(false);

  useOutsideClick(keywordRef, () => {
    setIsClick(false);
    setSelectIndex(-1);
  });

  return (
    <KeywordContext.Provider value={{ keyword, selectIndex, setSelectIndex, setKeyword }}>
      <S.Container ref={keywordRef}>
        <KeywordList isClick={isClick} setIsClick={setIsClick} />
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
