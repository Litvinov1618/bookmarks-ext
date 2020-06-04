import React from "react";
import { ReactComponent as SmallInterest } from "../img/small_interest.svg";
import { ReactComponent as MediumInterest } from "../img/medium_interest.svg";
import { ReactComponent as HighInterest } from "../img/high_interest.svg";

interface interestStatusProps {
  status: string;
}

const TimeIcon = (props: interestStatusProps) => {
  switch (props.status) {
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

export default TimeIcon;
