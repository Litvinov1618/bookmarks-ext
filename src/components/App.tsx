import React from "react";
import styled from "styled-components";
import SaveButton from "./SaveButton";
import Filters from "./Filters";
import BookmarkList from "./BookmarkList";

const Wrapper = styled.div`
  width: 320px;
  min-height: 329px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  return (
    <Wrapper>
      <SaveButton />
      <Filters />
      <BookmarkList />
    </Wrapper>
  );
};

export default App;
