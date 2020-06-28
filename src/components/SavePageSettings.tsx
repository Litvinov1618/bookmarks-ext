import React, { useState } from "react";
import styled from "styled-components";
import TimeIcon from "./TimeIcon";
import InterestIcon from "./InterestIcon";
import useFirestoreCollection from "../components/Firebase/useFirestoreCollection";

const Label = styled.label`
  margin-bottom: 10px;
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
`;

const InputWrapper = styled.div`
  width: 50%;
`;

const InputGroup = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
  position: relative

  &:hover {
    cursor: pointer;
  }
`;

interface SavePageProps {
  url: string;
  title: string;
}

const SavePageSettings: React.FC<SavePageProps> = ({ url, title }) => {
  const [time, setTime] = useState("");
  const handleTime = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTime(event.target.value);
    console.log(event.target.value);
  };

  const [interest, setInterest] = useState("");
  const handleInterest = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInterest(event.target.value);
  };

  const [tags, setTags] = useState("");
  const handleTags = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTags(event.target.value);
  };

  const { add } = useFirestoreCollection("pages", false);
  const [sendBtnStatus, setSendBtnStatus] = useState(false);
  const sendBookmark = () => {
    add({
      interest,
      tags: tags.split(", "),
      time,
      title,
      url,
    });
    setSendBtnStatus(true);
  };

  return (
    <Wrapper>
      <InputGroup>
        <InputWrapper>
          <Label>Read Time:</Label>
          <IconWrapper>
            <TimeIcon status="small" />
          </IconWrapper>
          <IconWrapper>
            <TimeIcon status="medium" />
          </IconWrapper>
          <IconWrapper>
            <TimeIcon status="high" />
          </IconWrapper>
        </InputWrapper>
        <InputWrapper>
          <Label>Interest:</Label>
          <IconWrapper>
            <InterestIcon status="small" />
          </IconWrapper>
          <IconWrapper>
            <InterestIcon status="medium" />
          </IconWrapper>
          <IconWrapper>
            <InterestIcon status="high" />
          </IconWrapper>
        </InputWrapper>
      </InputGroup>
      <InputGroup>
        <TagsArea placeholder="Tags" onChange={handleTags} value={tags} />
        <Button disabled={sendBtnStatus} onClick={sendBookmark}>
          Send
        </Button>
      </InputGroup>
    </Wrapper>
  );
};

export default SavePageSettings;
