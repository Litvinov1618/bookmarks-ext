import React from "react";
import { ReactComponent as LowTime } from "../img/low_time.svg";
import { ReactComponent as MediumTime } from "../img/medium_time.svg";
import { ReactComponent as HugeTime } from "../img/huge_time.svg";

interface timeStatusProps {
  status: string;
}

const TimeIcon = (props: timeStatusProps) => {
  switch (props.status) {
    case "low":
      return <LowTime />;
    case "medium":
      return <MediumTime />;
    case "huge":
      return <HugeTime />;
    default:
      return <LowTime />;
  }
};

export default TimeIcon;
