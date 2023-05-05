import CMContainer from '../common/CMContainer';
import styled from 'styled-components';
import { CSKeyword } from 'src/utils/const/keyword';
import CMNoticeLIne from '../common/CMNoticeLIne';

const KeywordRecent = ({
  selectIndex,
  handleKeywordClick,
}: {
  handleKeywordClick: (recent: string) => void;
  selectIndex: number;
}) => {
  const recentDatas = JSON.parse(localStorage.getItem(CSKeyword.RECENT_KEY) || '[]');
  return (
    <CMContainer>
      <S.SearchWrap>
        <CMNoticeLIne>최근 검색어</CMNoticeLIne>
        {recentDatas.length > 0 ? (
          recentDatas.map((recent: string, idx: number) => {
            return (
              <S.SearchItem
                onClick={() => {
                  handleKeywordClick(recent);
                }}
                focus={selectIndex === idx + 1}
              >
                {recent}
              </S.SearchItem>
            );
          })
        ) : (
          <CMNoticeLIne color={'#A7AFB7'}>최근 검색어가 없습니다.</CMNoticeLIne>
        )}
      </S.SearchWrap>
    </CMContainer>
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

export default KeywordRecent;
