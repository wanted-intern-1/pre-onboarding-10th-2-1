import React, { useRef, useState } from 'react';
import KeywordList from './KeywordList';
import styled from 'styled-components';
import useOutsideClick from 'src/hooks/useOutsideClick';

const KeywordMain = () => {
  const [isClick, setIsClick] = useState(false);
  const keywordRef = useRef<HTMLInputElement>(null);

  useOutsideClick(keywordRef, () => setIsClick(false));

  return (
    <S.Container ref={keywordRef}>
      <KeywordList isClick={isClick} setIsClick={setIsClick} />
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
