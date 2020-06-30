import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TimeIcon from "./TimeIcon";
import InterestIcon from "./InterestIcon";
import useFirestoreCollection from "./Firebase/useFirestoreCollection";

const Header = styled.header`
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

const Label = styled.label`
  margin: 0 0 3px 4px;
  display: block;
`;

const TagsArea = styled.textarea`
  border: 1px solid #e95656;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  resize: none;

  height: 30px;
  padding: 5px;
  width: 40%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 90px;
`;

const Button = styled.button`
  width: 90px;
  height: 30px;
  margin-left: 28px;
  padding: 5px;

  border: 1px solid #e95656;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: white;
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
    filter: saturate(150%);
  }
`;

const InputWrapper = styled.div`
  width: 50%;
  margin-left: -4px;
`;

const InputGroup = styled.div`
  display: flex;
`;

interface IconWrapperProps {
  selected: boolean;
}

const IconWrapper = styled.button<IconWrapperProps>`
  display: inline-block;
  padding: 4px 4px 2px 4px;

  border: 1px solid transparent;
  border-color: ${(props) => props.selected && "#e95656"};
  border-radius: 15px;
  font: inherit;
  color: inherit;
  background-color: transparent;
  outline: none;

  &:hover {
    cursor: pointer;
    border-color: #e95656;
  }

  &:active {
    transform: translateY(1px);
    filter: saturate(150%);
  }
`;

declare const chrome: {
  tabs: {
    query: (
      arg0: { active: boolean; lastFocusedWindow: boolean },
      arg1: (tabs: any[]) => void
    ) => void;
  };
};

const SavePageSettings: React.FC = () => {
  const [time, setTime] = useState("");
  const handleTime = (str: string) => {
    setTime(str);
  };

  const [interest, setInterest] = useState("");
  const handleInterest = (str: string) => {
    setInterest(str);
  };

  const [tags, setTags] = useState("");
  const handleTags = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTags(event.target.value);
  };

  useEffect(() => {
    if (process.env.REACT_APP_IS_EXTENSION) {
      chrome.tabs.query(
        { active: true, lastFocusedWindow: true },
        (tabs: Array<any>) => {
          setUrl(tabs[0].url);
          setTitle(tabs[0].title);
        }
      );
    } else console.log("You should go to extension to add pages");
  });

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const { add } = useFirestoreCollection("pages", false);
  const [sendBtnStatus, setSendBtnStatus] = useState(true);
  const sendBookmark = () => {
    if (process.env.REACT_APP_IS_EXTENSION) {
      add({
        interest,
        tags: tags.split(", "),
        time,
        title,
        url,
      });
      console.log(
        JSON.stringify({
          interest,
          tags: tags.split(", "),
          time,
          title,
          url,
        })
      );
    } else console.log("You should go to extension to add pages");
    setSendBtnStatus(false);
  };

  return (
    <Header>
      <MainContent>
        <Span>Save this page</Span>
        <Wrapper>
          <InputGroup>
            <InputWrapper>
              <Label>Read Time:</Label>
              <IconWrapper
                selected={time === "small"}
                onClick={() => handleTime("small")}
              >
                <TimeIcon status="small" />
              </IconWrapper>
              <IconWrapper
                selected={time === "medium"}
                onClick={() => handleTime("medium")}
              >
                <TimeIcon status="medium" />
              </IconWrapper>
              <IconWrapper
                selected={time === "high"}
                onClick={() => handleTime("high")}
              >
                <TimeIcon status="high" />
              </IconWrapper>
            </InputWrapper>
            <InputWrapper>
              <Label>Interest:</Label>
              <IconWrapper
                selected={interest === "small"}
                onClick={() => handleInterest("small")}
              >
                <InterestIcon status="small" />
              </IconWrapper>
              <IconWrapper
                selected={interest === "medium"}
                onClick={() => handleInterest("medium")}
              >
                <InterestIcon status="medium" />
              </IconWrapper>
              <IconWrapper
                selected={interest === "high"}
                onClick={() => handleInterest("high")}
              >
                <InterestIcon status="high" />
              </IconWrapper>
            </InputWrapper>
          </InputGroup>
          <InputGroup>
            <TagsArea placeholder="Tags" onChange={handleTags} value={tags} />
            <Button disabled={!sendBtnStatus} onClick={sendBookmark}>
              Send
            </Button>
          </InputGroup>
        </Wrapper>
      </MainContent>
    </Header>
  );
};

export default SavePageSettings;
