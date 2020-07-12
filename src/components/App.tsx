import React from "react";
import styled from "styled-components";
import SavePageMenu from "./BookmarkSaveOptions";
import SavedBookmarks from "./SavedBookmarks";

const Wrapper = styled.div`
  width: 320px;
  min-height: 400px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <SavePageMenu />
      <SavedBookmarks />
    </Wrapper>
  );
};

export default App;
