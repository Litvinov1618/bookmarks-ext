import React from "react";
import styled from "styled-components";
import SaveButton from "./SaveButton";
import FilterList from "./FilterList";
import BookmarkList from "./BookmarkList";

const Wrapper = styled.div`
  width: 320px;
  min-height: 329px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      {process.env.REACT_APP_IS_EXTENSION && <SaveButton />}
      <FilterList />
      <BookmarkList />
    </Wrapper>
  );
};

export default App;
