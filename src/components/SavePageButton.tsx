import React, { useState } from "react";
import styled from "styled-components";
import SavePageSettings from "./SavePageSettings";

const Wrapper = styled.header`
  border: 2px solid #e95656;
  box-sizing: border-box;
  border-radius: 20px;

  min-height: 50px;
  width: 300px;
  margin: 4px 0 10px 0;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  padding: 10px;
`;

const Span = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  display: block;
  margin-bottom: 5px;
`;

declare const chrome: {
  tabs: {
    query: (
      arg0: { active: boolean; lastFocusedWindow: boolean },
      arg1: (tabs: any[]) => void
    ) => void;
  };
};

const SavePageButton: React.FC = () => {
  const [pageUrl, setPageUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const savePage = () => {
    if (process.env.REACT_APP_IS_EXTENSION) {
      chrome.tabs.query(
        { active: true, lastFocusedWindow: true },
        (tabs: Array<any>) => {
          setPageUrl(tabs[0].url);
          setPageTitle(tabs[0].title);
        }
      );
    }
  };
  return (
    <Wrapper>
      <MainContent onClick={savePage}>
        <Span>Save this page</Span>
        <SavePageSettings url={pageUrl} title={pageTitle} />
      </MainContent>
    </Wrapper>
  );
};

export default SavePageButton;
