import React, { forwardRef,useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { CSKeyword } from 'src/utils/const/keyword';
import { keyboards } from 'src/utils/const/keyboard';
import { IKeyword } from 'src/types/keyword';
import useForwardRef from 'src/hooks/useForwardRef';
import { addRecentKeyword, getRecentKeywords } from 'src/api/localStorage';
import { useDebounce } from 'src/hooks/useDebounce';

type Props = {
  keyword: string;
  selectIndex: number;
  isClick: boolean;
  keywords: IKeyword[];
  isLoading: boolean;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSelectIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (keyword: string) => Promise<void>;
};

const KeywordInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      keyword,
      selectIndex,
      isClick,
      keywords,
      setKeyword,
      setSelectIndex,
      setIsLoading,
      setIsClick,
      handleSearch,
    },
    ref
  ) => {
    const onCancleBtn = (e: React.MouseEvent) => {
      e.stopPropagation();
      setKeyword('');
      setSelectIndex(-1);
    };

    const handleSearchKeyword = () => {
      handleEnterPress(keyword, getRecentKeywords());
    };

    const refLocal = useForwardRef<HTMLInputElement>(ref);

    const handleEnterPress = (keyword: string, recents: string[]) => {
      refLocal.current.blur();
      setIsClick(false);
      setSelectIndex(-1);
      let recent;
      if (keyword) {
        handleSearch(keyword);
        recent = selectIndex === -1 || selectIndex === 0 ? keyword : keywords[selectIndex - 1].name;
      } else {
        if (selectIndex === -1) return;
        recent = recents[selectIndex - 1];
      }
      addRecentKeyword(recent);
      setKeyword(recent);
    };

    const moveRecentUp = (recents: string[]) => {
      setSelectIndex((prev) => (prev <= 1 ? recents.length : prev - 1));
    };

    const moveKeywordUp = (keywords: IKeyword[]) => {
      setSelectIndex((prev) => (prev <= 0 ? keywords.length : prev - 1));
    };

    const moveRecentDown = (recents: string[]) => {
      setSelectIndex((prev) => (selectIndex === -1 ? 1 : prev >= recents.length ? 1 : prev + 1));
    };

    const moveKeywordDown = (keywords: IKeyword[]) => {
      setSelectIndex((prev) => (prev >= keywords.length ? 0 : prev + 1));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.nativeEvent.isComposing) return;
      const recents = JSON.parse(localStorage.getItem(CSKeyword.RECENT_KEY) || '[]');
      const moveUp = keyword ? moveKeywordUp : moveRecentUp;
      const moveDown = keyword ? moveKeywordDown : moveRecentDown;

      switch (e.key) {
        case keyboards.ESCAPE:
          setKeyword('');
          break;
        case keyboards.ENTER:
          handleEnterPress(keyword, recents);
          break;
        case keyboards.DOWN:
          e.preventDefault();
          moveDown(keyword ? keywords : recents);
          break;
        case keyboards.UP:
          e.preventDefault();
          moveUp(keyword ? keywords : recents);
          break;
        default:
          break;
      }
    };

    const handleInputClick = () => {
      setIsClick(true);
      setSelectIndex(-1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
      setIsLoading(true);
      setSelectIndex(-1);
    };

    const debounceKeyword = useDebounce(keyword);

    useEffect(() => {
      handleSearch(debounceKeyword);
    }, [debounceKeyword]);

    return (
      <S.Box isClick={isClick}>
        <S.Line onClick={handleInputClick}>
          {!isClick && !keyword && (
            <S.NoticeWrap>
              <S.SearchInputIcon />
              <S.Notice>질환명을 입력해 주세요</S.Notice>
            </S.NoticeWrap>
          )}
          <S.SearchInputWrap>
            <S.SearchInput
              onKeyDown={handleKeyPress}
              value={keyword}
              onChange={handleChange}
              ref={refLocal}
            />
            {isClick && <S.SearchInputCancleIcon onClick={onCancleBtn} color="#A7AFB7" />}
          </S.SearchInputWrap>
        </S.Line>
        <S.SubmItBtn onClick={handleSearchKeyword}>
          <S.SearchIcon color="#fff" />
        </S.SubmItBtn>
      </S.Box>
    );
  }
);

const S = {
  Box: styled.div<{ isClick?: boolean }>`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    border-radius: 42px;
    border: 2px solid #fff;
    background-color: #fff;
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
  NoticeWrap: styled.div<{ isClick?: boolean }>`
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    color: #a7afb7;
    pointer-events: none;
    font-weight: 700;
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
