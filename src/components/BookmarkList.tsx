import React from "react";
import styled from "styled-components";
import BookmarkItem from "./BookmarkItem";

const Wrapper = styled.main`
  width: 300px;
  min-height: 224px;
`;

const Bookmarks = () => {
  const allPages = [
    {
      url:
        "https://dtf.ru/hard/153766-vice-prezident-playstation-po-ux-dizaynu-ps5-poluchit-polnostyu-novyy-interfeys",
      title:
        "Вице-президент PlayStation по UX-дизайну: PS5 получит полностью новый интерфейс",
      tags: ["DTF", "PS5"],
      interest: "high",
      time: "small",
    },
    {
      url:
        "https://dtf.ru/gameindustry/152790-pochemu-grafika-v-igrah-s-prezentacii-playstation-ne-vpechatlyaet-no-tak-i-dolzhno-byt",
      title:
        "Почему графика в играх с презентации PlayStation не впечатляет — но так и должно быть",
      tags: ["DTF", "PS5", "Longread"],
      interest: "medium",
      time: "high",
    },
    {
      url: "https://dtf.ru/games/133965-bagrovaya-piramida-dwarf-fortress",
      title: "Багровая пирамида (Dwarf Fortress)",
      tags: ["DTF", "Stories", "Longread", "Dwarf Fortress"],
      interest: "high",
      time: "high",
    },
    {
      url: "https://www.youtube.com/watch?v=GW5uUze0WIs",
      title: "Youtube",
      tags: ["DTF", "Stories", "Longread", "Dwarf Fortress"],
      interest: "high",
      time: "high",
    },
  ];
  return (
    <Wrapper>
      {allPages.map((pageInfo) => (
        <BookmarkItem pageInfo={pageInfo} key={pageInfo.url} />
      ))}
    </Wrapper>
  );
};

export default Bookmarks;
