import React from "react";
import styled from "styled-components";
import TimeIcon from "../Icons/TimeIcon";

const mainColor = process.env.REACT_APP_MAIN_COLOR;

interface IconWrapperProps {
  selected: boolean;
}

const IconWrapper = styled.button<IconWrapperProps>`
  display: inline-block;
  padding: 4px 4px 2px 4px;

  border: 1px solid transparent;
  border-color: ${(props) => props.selected && mainColor};
  border-radius: 15px;
  font: inherit;
  color: inherit;
  background-color: transparent;
  outline: none;

  &:hover {
    cursor: pointer;
    border-color: ${mainColor};
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

const Label = styled.label`
  margin: 0 0 3px 4px;
  display: block;
`;

const TimeOption = ({
  time,
  selected,
  onSelect,
}: {
  time: string;
  selected: boolean;
  onSelect: () => void;
}) => (
  <IconWrapper selected={selected} onClick={onSelect}>
    <TimeIcon status={time} />
  </IconWrapper>
);
const TimeSelect = ({
  time,
  onSelect,
}: {
  time: string;
  onSelect: (time: string) => void;
}) => (
  <InputWrapper>
    <Label>Time:</Label>
    <TimeOption
      time="small"
      selected={time === "small"}
      onSelect={() => onSelect("small")}
    />
    <TimeOption
      time="medium"
      selected={time === "medium"}
      onSelect={() => onSelect("medium")}
    />
    <TimeOption
      time="high"
      selected={time === "high"}
      onSelect={() => onSelect("high")}
    />
  </InputWrapper>
);

export default TimeSelect;
