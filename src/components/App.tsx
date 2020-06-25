import React from "react";
import styled from "styled-components";
import SavePageButton from "./SavePageButton";
import SavedBookmarks from "./SavedBookmarks";

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
      {process.env.REACT_APP_IS_EXTENSION && <SavePageButton />}
      <SavedBookmarks />
    </Wrapper>
  );
};

export default App;
