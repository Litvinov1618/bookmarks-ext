import React from "react";
import { ReactComponent as LowInterest } from "../img/low_interest.svg";
import { ReactComponent as MediumInterest } from "../img/medium_interest.svg";
import { ReactComponent as HugeInterest } from "../img/huge_interest.svg";

interface interestStatusProps {
  status: string;
}

const TimeIcon = (props: interestStatusProps) => {
  switch (props.status) {
    case "low":
      return <LowInterest />;
    case "medium":
      return <MediumInterest />;
    case "huge":
      return <HugeInterest />;
    default:
      return <LowInterest />;
  }
};

export default TimeIcon;
