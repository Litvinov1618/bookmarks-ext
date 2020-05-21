import React from 'react';
import styled from 'styled-components';
import SaveButton from './SaveButton';
import Filters from './Filters';
import Bookmarks from './Bookmarks';

const Wrapper = styled.div`
  width: 320px;
  min-height: 329px;

  background: #fffff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <Wrapper>
      <SaveButton />
      <Filters />
      <Bookmarks />
    </Wrapper>
  );
}

export default App;
