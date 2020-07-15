import React from "react";
import styled from "styled-components";
import InterestIcon from "../Icons/InterestIcon";

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

const InterestOption = ({
  interest,
  selected,
  onSelect,
}: {
  interest: string;
  selected: boolean;
  onSelect: () => void;
}) => (
  <IconWrapper selected={selected} onClick={onSelect}>
    <InterestIcon status={interest} />
  </IconWrapper>
);
const InterestSelect = ({
  interest,
  onSelect,
}: {
  interest: string;
  onSelect: (interest: string) => void;
}) => (
  <InputWrapper>
    <Label>Interest:</Label>
    <InterestOption
      interest="small"
      selected={interest === "small"}
      onSelect={() => onSelect("small")}
    />
    <InterestOption
      interest="medium"
      selected={interest === "medium"}
      onSelect={() => onSelect("medium")}
    />
    <InterestOption
      interest="high"
      selected={interest === "high"}
      onSelect={() => onSelect("high")}
    />
  </InputWrapper>
);

export default InterestSelect;
