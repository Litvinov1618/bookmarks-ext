import React from "react";
import styled from "styled-components";
import BookmarkItem from "./BookmarkItem";

const Wrapper = styled.main`
  width: 300px;
  min-height: 224px;
`;

const Bookmarks = () => {
  return (
    <Wrapper>
      <BookmarkItem></BookmarkItem>
    </Wrapper>
  );
};

export default Bookmarks;
