import { IllustPersonOne, IllustPersonThree, IllustPersonTwo } from 'src/assets';
import styled from 'styled-components';
export const Background = () => {
  return (
    <S.Cont>
      <S.IllustContOne>
        <IllustPersonOne />
      </S.IllustContOne>
      <S.IllustContTwo>
        <IllustPersonTwo />
      </S.IllustContTwo>
      <S.IllustContThree>
        <IllustPersonThree />
      </S.IllustContThree>
    </S.Cont>
  );
};

const S = {
  Cont: styled.div`
    position: relative;
    min-width: 1000px;
  `,
  IllustContOne: styled.div`
    position: absolute;
    width: 148px;
    left: 0;
    top: 200px;
  `,
  IllustContTwo: styled.div`
    position: absolute;
    width: 130px;
    right: 124px;
    top: 280px;
  `,
  IllustContThree: styled.div`
    position: absolute;
    width: 116px;
    right: 20px;
    top: 188px;
  `,
};
