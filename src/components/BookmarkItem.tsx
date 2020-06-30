import React from "react";
import styled from "styled-components";
import TimeIcon from "./TimeIcon";
import InterestIcon from "./InterestIcon";
import { BookmarkDocument } from "../interfaces";
import { ReactComponent as DoneButton } from "../img/done_button.svg";

const Article = styled.article`
  width: 100%;
  position: relative;
  max-height: 55px;
  margin-bottom: 10px;
`;

const Section = styled.section`
  width: 100%;
  height: 20px;
  display: flex;

  justify-content: space-between;
  align-items: center;
`;

const Title = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: black;
  text-decoration: none;

  margin: 0px;
  max-width: 85%;
`;

const Hr = styled.div`
  height: 1px;
  background-color: #e95656;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Link = styled.p`
  margin: 0px;
  font-size: 12px;
  width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Tags = styled.p`
  margin: 0px;
  font-size: 12px;
  color: #6f6f6f;
  width: 50%;
  white-space: pre-wrap;
`;

const StyledCloseButton = styled(DoneButton)`
  display: none;
  position: absolute;
  bottom: 0px;
  right: 0px;

  &:hover {
    cursor: pointer;
  }

  ${Article}:hover & {
    display: inline;
  }
`;

interface BookmarkItemProps {
  pageInfo: BookmarkDocument;
  pageId: string;
  remove: Function;
}

const Bookmark: React.FC<BookmarkItemProps> = (props) => {
  const { url, title, interest, time, tags } = props.pageInfo;

  const deletePage = () => {
    props.remove(props.pageId);
  };
  return (
    <Article>
      <Section>
        <Title href={url} title={title}>
          {title}
        </Title>
        <div>
          <InterestIcon status={interest} />
          <TimeIcon status={time} />
        </div>
      </Section>
      <Hr />
      <Wrapper>
        <Link>{url.match(/\/{2}[\w.\\-]+/)![0].slice(2)}</Link>
        <Tags>{tags && tags.join(", ")}</Tags>
      </Wrapper>
      <StyledCloseButton onClick={deletePage} />
    </Article>
  );
};

export default Bookmark;
