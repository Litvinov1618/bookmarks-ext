import React from "react";
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

  height: 230px;
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

interface urlProp {
  url: string;
}

const SavePageSettings = () =>
  // prop: urlProp
  {
    return (
      <Wrapper>
        <div>
          {/* <h2>URL: {prop.url}</h2> */}
          <Label>Read Time:</Label>
          <InputList>
            <InputItem>
              <Input type="radio" name="time" />
              <TimeIcon status="low" />
            </InputItem>
            <InputItem>
              <Input type="radio" name="time" />
              <TimeIcon status="medium" />
            </InputItem>
            <InputItem>
              <Input type="radio" name="time" />
              <TimeIcon status="huge" />
            </InputItem>
          </InputList>
        </div>
        <div>
          <Label>Interest:</Label>
          <InputList>
            <InputItem>
              <Input type="radio" name="interest" />
              <InterestIcon status="low" />
            </InputItem>
            <InputItem>
              <Input type="radio" name="interest" />
              <InterestIcon status="medium" />
            </InputItem>
            <InputItem>
              <Input type="radio" name="interest" />
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
