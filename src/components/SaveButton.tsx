import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowDown } from "../img/arrow_down.svg";
import SavePageSettings from "./SavePageSettings";

const Wrapper = styled.header`
  width: 300px;
  min-height: 50px;
  margin: 4px 0 10px 0;

  border: 2px solid #e95656;
  box-sizing: border-box;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 11px 14px;

  &:hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
`;

declare var chrome: any;

interface pageInfo {
  url: string;
  title: string;
}

const SaveButton = () => {
  const [AdditionalContentStatus, setAdditionalContentStatus] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const savePage = () => {
    if (AdditionalContentStatus === false) {
      setAdditionalContentStatus(true);
      chrome.tabs.query(
        { active: true, lastFocusedWindow: true },
        (tabs: Array<any>) => {
          setPageUrl(tabs[0].url);
          setPageTitle(tabs[0].title);
        }
      );
    } else setAdditionalContentStatus(false);
  };
  return (
    <Wrapper>
      <MainContent onClick={savePage}>
        <Span>Save this page</Span>
        <ArrowDown />
      </MainContent>
      {AdditionalContentStatus && (
        <SavePageSettings url={pageUrl} title={pageTitle} />
      )}
    </Wrapper>
  );
};

export default SaveButton;
