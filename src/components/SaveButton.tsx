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

const SaveButton: React.FC = () => {
  const [AddContentStatus, setAddContentStatus] = useState(false);
  // const [pageUrl, setPageUrl] = useState("");
  const savePage = () => {
    if (AddContentStatus === false) {
      setAddContentStatus(true);
      // chrome.tabs.query(
      //   { active: true, lastFocusedWindow: true },
      //   (tabs: any) => {
      //     let url = tabs[0].url;
      //     setPageUrl(url);
      //   }
      // );
    } else setAddContentStatus(false);
  };
  return (
    <Wrapper>
      <MainContent onClick={savePage}>
        <Span>Save this page</Span>
        <ArrowDown />
      </MainContent>
      {AddContentStatus && (
        <SavePageSettings
        // url={pageUrl}
        />
      )}
    </Wrapper>
  );
};

export default SaveButton;
