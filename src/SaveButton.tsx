import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowDown } from './img/arrow_down.svg';

const Wrapper = styled.header`
  width: 300px;
  height: 50px;
  margin: 4px 0 10px 0;
  padding: 11px 14px;

  border: 2px solid #E95656;
  box-sizing: border-box;
  border-radius: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Span = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
`;

const SaveButton = () => {
  return (
    <Wrapper>
      <Span>Save this page</Span>
      <ArrowDown />
    </Wrapper>
  );
}

export default SaveButton;
