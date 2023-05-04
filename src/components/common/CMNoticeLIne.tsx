import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children?: ReactNode;
  text?: string;
  color?: string;
};

const CMNoticeLIne = ({ children, text, color }: Props) => {
  return <NoticeLine color={color}>{children ? children : text}</NoticeLine>;
};

const NoticeLine = styled.div<{ color?: string }>`
  font-size: 12px;
  padding: 10px 20px;
  font-weight: 500;
  color: ${({ color }) => color};
`;

export default CMNoticeLIne;
