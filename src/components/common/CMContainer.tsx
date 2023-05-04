import React, { ReactNode } from 'react';
import styled from 'styled-components';

const CMContainer = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  background-color: #fff;
  width: 520px;
  position: absolute;
  top: 80px;
  left: 10px;
  max-height: 320px;
  overflow: hidden;
  border-radius: 15px;
  padding: 10px 0px;
`;

export default CMContainer;
