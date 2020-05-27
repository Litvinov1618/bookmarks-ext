import React from "react";
import styled from "styled-components";

const Wrapper = styled.nav`
  height: 30px;
  width: 300px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Filter = styled.div`
  width: 90px;
  height: 29px;

  border: 1px solid #e95656;
  box-sizing: border-box;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const Span = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
`;

const Filters: React.FC = () => {
  return (
    <Wrapper>
      <Filter>
        <Span>Read Time</Span>
      </Filter>
      <Filter>
        <Span>Interest</Span>
      </Filter>
      <Filter>
        <Span>Tags</Span>
      </Filter>
    </Wrapper>
  );
};

export default Filters;
