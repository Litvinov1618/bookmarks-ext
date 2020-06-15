import React from "react";
import { ReactComponent as SmallTime } from "../img/small_time.svg";
import { ReactComponent as MediumTime } from "../img/medium_time.svg";
import { ReactComponent as HighTime } from "../img/high_time.svg";

interface TimeIconProps {
  status: string;
}

const TimeIcon: React.FC<TimeIconProps> = (props) => {
  switch (props.status) {
    case "small":
      return <SmallTime />;
    case "medium":
      return <MediumTime />;
    case "high":
      return <HighTime />;
    default:
      return <SmallTime />;
  }
};

export default TimeIcon;
