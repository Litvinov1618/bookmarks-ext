import React, { useState, ChangeEvent } from "react";
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

interface pageInfo {
  url: string;
  title: string;
}

const SavePageSettings = (prop: pageInfo) => {
  const [timeStatus, setTimeStatus] = useState("");
  const handleTimeStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeStatus(event.target.value);
    console.log(event.target.value);
  };

  const [interestStatus, setInterestStatus] = useState("");
  const handleInterestStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInterestStatus(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Wrapper>
      <div>
        <h2>URL: {prop.url}</h2>
        <h2>Title: {prop.title}</h2>
        <Label>Read Time:</Label>
        <InputList>
          <InputItem>
            <Input
              type="radio"
              name="time"
              value="low"
              onChange={handleTimeStatusChange}
              checked={timeStatus === "low"}
            />
            <TimeIcon status="low" />
          </InputItem>
          <InputItem>
            <Input
              type="radio"
              name="time"
              value="medium"
              checked={timeStatus === "medium"}
              onChange={handleTimeStatusChange}
            />
            <TimeIcon status="medium" />
          </InputItem>
          <InputItem>
            <Input
              type="radio"
              name="time"
              value="huge"
              checked={timeStatus === "huge"}
              onChange={handleTimeStatusChange}
            />
            <TimeIcon status="huge" />
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
              value="low"
              onChange={handleInterestStatusChange}
              checked={interestStatus === "low"}
            />
            <InterestIcon status="low" />
          </InputItem>
          <InputItem>
            <Input
              type="radio"
              name="interest"
              value="medium"
              onChange={handleInterestStatusChange}
              checked={interestStatus === "medium"}
            />
            <InterestIcon status="medium" />
          </InputItem>
          <InputItem>
            <Input
              type="radio"
              name="interest"
              value="huge"
              onChange={handleInterestStatusChange}
              checked={interestStatus === "huge"}
            />
            <InterestIcon status="huge" />
          </InputItem>
        </InputList>
      </div>
      <div>
        <Label>Tags:</Label>
        <TextArea />
      </div>
      <ButtonWrapper>
        <Button>Send</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SavePageSettings;
