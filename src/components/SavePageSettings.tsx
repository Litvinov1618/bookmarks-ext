import React, { useState } from "react";
import styled from "styled-components";
import TimeIcon from "./TimeIcon";
import InterestIcon from "./InterestIcon";

const InputList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

const Input = styled.input`
  margin-right: 5px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  display: block;
`;

const TextArea = styled.textarea`
  border: 1px solid #e95656;
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  resize: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  min-height: 290px;
  padding: 0 14px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const Button = styled.button`
  width: 90px;
  height: 29px;
  margin-bottom: 10px;

  border: 1px solid #e95656;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: white;
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }
`;

const SavingPageInfo = styled.h2`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface SavePageProps {
  url: string;
  title: string;
}

declare const chrome: any;

const SavePageSettings: React.FC<SavePageProps> = (prop) => {
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

  const [savingPageInfo, setSavingPageInfo] = useState({});
  const sendBookmark = () => {
    setSavingPageInfo({
      url: prop.url,
      title: prop.title,
      time,
      interest,
      tags: tags.split(",").map((str) => str.trim()),
    });
    chrome.storage.local.set(savingPageInfo, function () {
      alert("Value is set to " + savingPageInfo);
    });
    chrome.storage.local.get(savingPageInfo, function () {
      alert("Value currently is " + savingPageInfo);
    });
  };

  return (
    <Wrapper>
      <div>
        <SavingPageInfo>URL: {prop.url}</SavingPageInfo>
        <SavingPageInfo>Title: {prop.title}</SavingPageInfo>
        <Label>Read Time:</Label>
        <InputList>
          <InputItem>
            <Input
              type="radio"
              name="time"
              value="small"
              checked={time === "small"}
              onChange={handleTime}
            />
            <TimeIcon status="small" />
          </InputItem>
          <InputItem>
            <Input
              type="radio"
              name="time"
              value="medium"
              checked={time === "medium"}
              onChange={handleTime}
            />
            <TimeIcon status="medium" />
          </InputItem>
          <InputItem>
            <Input
              type="radio"
              name="time"
              value="high"
              checked={time === "high"}
              onChange={handleTime}
            />
            <TimeIcon status="high" />
          </InputItem>
        </InputList>
      </div>
      <div>
        <Label>Interest:</Label>
        <InputList>
          <InputItem>
            <Input
              type="radio"
              name="interest"
              value="small"
              onChange={handleInterest}
              checked={interest === "small"}
            />
            <InterestIcon status="small" />
          </InputItem>
          <InputItem>
            <Input
              type="radio"
              name="interest"
              value="medium"
              onChange={handleInterest}
              checked={interest === "medium"}
            />
            <InterestIcon status="medium" />
          </InputItem>
          <InputItem>
            <Input
              type="radio"
              name="interest"
              value="high"
              onChange={handleInterest}
              checked={interest === "high"}
            />
            <InterestIcon status="high" />
          </InputItem>
        </InputList>
      </div>
      <div>
        <Label>Tags:</Label>
        <TextArea onChange={handleTags} value={tags} />
      </div>
      <ButtonWrapper>
        <Button onClick={sendBookmark}>Send</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SavePageSettings;
