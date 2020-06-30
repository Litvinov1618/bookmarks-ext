import React, { SetStateAction } from "react";
import { ReactComponent as SmallInterest } from "../img/small_interest.svg";
import { ReactComponent as MediumInterest } from "../img/medium_interest.svg";
import { ReactComponent as HighInterest } from "../img/high_interest.svg";

interface InterestIconProps {
  status: string;
  onClick?: (event: { target: { value: SetStateAction<string> } }) => void;
  id?: string;
}

const InterestIcon: React.FC<InterestIconProps> = ({ status }) => {
  switch (status) {
    case "small":
      return <SmallInterest />;
    case "medium":
      return <MediumInterest />;
    case "high":
      return <HighInterest />;
    default:
      return <SmallInterest />;
  }
};

export default InterestIcon;
