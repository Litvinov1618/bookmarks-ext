import React, { CSSProperties } from "react";
import styled, { keyframes } from "styled-components";

const commonStyle = {
  margin: "auto",
  position: "absolute",
  left: 0,
  right: 0,
  top: "40%",
  bottom: 0,
};

const bouncedelay = keyframes`
  0% {
    transform: rotate(360deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

interface LoadingContainerProps {
  size: string;
  color: string;
}

const LoadingContainer = styled.div<LoadingContainerProps>`
  height: 0;
  width: 4px;
  border-width: 0 4px
    ${(props) =>
      props.size === "small" ? 40 : props.size === "large" ? 60 : 50}px
    4px;
  border-style: none solid solid;
  border-color: transparent transparent ${(props) => props.color || "#00adb5"};
  position: relative;
  padding-top: 25px;
`;

const ItemFirst = styled.div<LoadingContainerProps>`
  height: 0;
  width: 2px;
  border-width: ${(props) =>
      props.size === "small" ? 24 : props.size === "large" ? 40 : 30}px
    2px 0px 2px;
  border-style: solid solid none;
  border-color: ${(props) => props.color || "#00adb5"} transparent transparent;
  transform-origin: 0 -2px;
  transform: rotate(60deg);
  position: absolute;
`;

const ItemSecord = styled.div<LoadingContainerProps>`
  height: 0;
  width: 2px;
  border-width: ${(props) =>
      props.size === "small" ? 24 : props.size === "large" ? 40 : 30}px
    2px 0px 2px;
  border-style: solid solid none;
  border-color: ${(props) => props.color || "#00adb5"} transparent transparent;
  transform-origin: 2px -1px;
  transform: rotate(180deg);
  position: absolute;
`;

const ItemThree = styled.div<LoadingContainerProps>`
  height: 0;
  width: 2px;
  border-width: ${(props) =>
      props.size === "small" ? 24 : props.size === "large" ? 40 : 30}px
    2px 0px 2px;
  border-style: solid solid none;
  border-color: ${(props) => props.color || "#00adb5"} transparent transparent;
  transform-origin: 5px 0;
  transform: rotate(300deg);
  position: absolute;
`;

const Center = styled.div`
  width: 4px;
  height: 4px;
  border: 3px ${(props) => props.color || "#00adb5"} solid;
  background: #fff;
  border-radius: 5px;
  transform: translateX(-3px) translateY(-4px);
  position: absolute;
`;

interface ConProps {
  speed: number;
}

const Con = styled.div<ConProps>`
  position: relative;
  animation: ${bouncedelay} ${(props) => props.speed || 5}s infinite linear;
`;

interface LoadingProps {
  color: string;
  speed: number;
  size?: string;
}

const LoadingIcon: React.FC<LoadingProps> = ({
  color,
  speed,
  size = "default",
}) => {
  return (
    <LoadingContainer
      style={commonStyle as CSSProperties}
      color={color}
      size={size}
    >
      <Center color={color} />
      <Con speed={speed}>
        <ItemFirst color={color} size={size} />
        <ItemSecord color={color} size={size} />
        <ItemThree color={color} size={size} />
      </Con>
    </LoadingContainer>
  );
};

export default LoadingIcon;
