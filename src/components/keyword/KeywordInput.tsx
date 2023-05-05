import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { CSKeyword } from 'src/utils/const/keyword';
import { keyboards } from 'src/utils/const/keyboard';
import KeywordList from './KeywordList';
import debounce from 'src/utils/debounce';

type Props = {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
};

const KeywordInput = ({ isClick, setIsClick }: Props) => {
  const onCancleBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = '';
  };

  const [keyword, setKeyword] = useState('');
  const [selectIndex, setSelectIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchKeyword = () => {
    if (keyword) localStorage.setItem(CSKeyword.RECENT_KEY, keyword);
  };

  const debounceValue = debounce(setKeyword);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === keyboards.ESCAPE) {
      if (inputRef.current) inputRef.current.value = '';
    }
    if (e.key === keyboards.ENTER) {
      if (keyword) {
        const recents = JSON.parse(localStorage.getItem(CSKeyword.RECENT_KEY) || '[]');
        const jsonRecents = JSON.stringify([...recents, keyword]);
        localStorage.setItem(CSKeyword.RECENT_KEY, jsonRecents);
      }
    }
    if (e.key === keyboards.DOWN) {
      if (CSKeyword.MAX_LEN === selectIndex + 1) return;
      setSelectIndex((prev) => prev + 1);
    }
    if (e.key === keyboards.UP) {
      if (selectIndex === 0) return;
      setSelectIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <S.Box isClick={isClick}>
        <S.Line onClick={() => setIsClick(true)}>
          {!isClick && !keyword && (
            <NoticeWrap>
              <S.SearchInputIcon />
              <S.Notice>질환명을 입력해 주세요</S.Notice>
            </NoticeWrap>
          )}
          <S.SearchInputWrap>
            <S.SearchInput ref={inputRef} onKeyDown={handleKeyPress} onChange={debounceValue} />
            {isClick && <S.SearchInputCancleIcon onClick={onCancleBtn} color="#A7AFB7" />}
          </S.SearchInputWrap>
        </S.Line>
        <S.SubmItBtn onClick={handleSearchKeyword}>
          <S.SearchIcon color="#fff" />
        </S.SubmItBtn>
      </S.Box>
      {
        inputRef.current &&
        <KeywordList
          setSelectIndex={setSelectIndex}
          selectIndex={selectIndex}
          keyword={inputRef.current.value}
          isClick={isClick}
          setIsClick={setIsClick}
        />
      }
    </>
  );
};

const NoticeWrap = styled.div<{ isClick?: boolean }>`
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: #a7afb7;
  pointer-events: none;
  font-weight: 700;
`;

const S = {
  Box: styled.div<{ isClick?: boolean }>`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    border-radius: 42px;
    border: 2px solid #fff;
    background-color: #fff;
    width: 100%;
    border-color: ${({ isClick }) => (isClick ? 'rgb(25, 118, 210)' : '#fff')};
    position: relative;
  `,
  Line: styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
  `,
  SubmItBtn: styled.button`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #007be9;
    border: none;
  `,
  SearchIcon: styled(AiOutlineSearch)`
    width: 28px;
    height: 28px;
  `,
  SearchInputIcon: styled(AiOutlineSearch)`
    & > path {
      fill: '#A7AFB7';
    }
    width: 25px;
    height: 25px;
  `,
  Notice: styled.div`
    margin-left: 10px;
  `,
  SearchInputCancleIcon: styled(MdCancel)`
    width: 25px;
    height: 25px;
    cursor: pointer;
  `,
  SearchInput: styled.input`
    font-size: 20px;
    outline: none;
    border: none;
    flex: 1;
  `,
  SearchInputWrap: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};

export default KeywordInput;
