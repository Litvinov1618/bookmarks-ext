import React from 'react';
import { ReactComponent as LowTime } from './img/low_time.svg';
import { ReactComponent as MediumInterest } from './img/medium_interest.svg';
import styled from 'styled-components';

const Article = styled.article`
  width: 100%;
  height: 55px;
  margin-bottom: 5px;
`;

const Section = styled.section`
  width: 100%;
  height: 20px;
  display: flex;
`;

const H1 = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Hr = styled.div`
  height: 1px;
  background-color: #E95656;
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
  color: #6F6F6F;
  width: 50%;
  white-space: pre-wrap;
`;

const Bookmark = () => {
  return (
    <Article>
      <Section>
        <H1>7 Beautiful Mosaic-Tiled Stairways in San Francisco</H1>
        <MediumInterest />
        <LowTime />
      </Section>
      <Hr />
      <Wrapper>
        <Link>thebolditalic.com</Link>
        <Tags>#Art</Tags>
      </Wrapper>
    </Article>
  );
}

export default Bookmark;
