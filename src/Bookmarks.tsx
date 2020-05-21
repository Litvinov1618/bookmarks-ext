import React from 'react';
import styled from 'styled-components';
import Bookmark from './Bookmark';

const Wrapper = styled.main`
  width: 300px;
  min-height: 224px;
`;

const Bookmarks = () => {
  return (
    <Wrapper>
      <Bookmark></Bookmark>
      <Bookmark></Bookmark>
      <Bookmark></Bookmark>
      <Bookmark></Bookmark>
    </Wrapper>
  );
}

export default Bookmarks;
