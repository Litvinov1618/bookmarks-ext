import React, { useState } from "react";
import styled from "styled-components";
import InterestSelect from "./PresentationComponents/InterestSelect";
import TimeSelect from "./PresentationComponents/TimeSelect";
import useFirestorePagesCollection from "./Firebase/useFirestorePagesCollection";
import useActiveTabDetails from "./Hooks/useActiveTabDetails";
import useBookmarkOptions from "./Hooks/useBookmarkOptions";

const isExtension = process.env.REACT_APP_IS_EXTENSION;
const mainColor = process.env.REACT_APP_MAIN_COLOR;

const Header = styled.header`
  border: 2px solid ${mainColor};
  box-sizing: border-box;
  border-radius: 20px;

  min-height: 50px;
  width: 300px;
  margin: 4px 0 10px 0;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  padding: 10px;
`;

const Span = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  display: block;
  margin-bottom: 5px;
`;

const TagsArea = styled.textarea`
  border: 1px solid ${mainColor};
  box-sizing: border-box;
  border-radius: 5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  resize: none;

  height: 30px;
  padding: 5px;
  width: 40%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 90px;
`;

const Button = styled.button`
  width: 90px;
  height: 30px;
  margin-left: 23px;
  padding: 5px;

  border: 1px solid ${mainColor};
  box-sizing: border-box;
  border-radius: 5px;
  background-color: white;
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
    filter: saturate(150%);
  }
`;

const InputGroup = styled.div`
  display: flex;
`;

const SaveBookmarkMenu: React.FC = () => {
  const [{ time, interest, tags }, updateOptions] = useBookmarkOptions();
  const handleTags = (tags: string) => updateOptions({ tags });

  const { url, title } = useActiveTabDetails();

  const { addPage } = useFirestorePagesCollection("pages", false);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
  const sendBookmark = () => {
    setSendButtonDisabled(true);

    if (!isExtension) {
      console.log("You should go to the extension to add pages");
      return;
    }

    return addPage({
      interest: interest,
      tags: tags.split(", "),
      time: time,
      title,
      url,
      archived: false,
    })
      .then(() => updateOptions({ time: "", interest: "", tags: "" }))
      .catch((error) => alert(error));
  };

  return (
    <Header>
      <MainContent>
        <Span>Save this page</Span>
        <Wrapper>
          <InputGroup>
            <InterestSelect
              interest={interest}
              onSelect={(interest) => updateOptions({ interest })}
            />
            <TimeSelect
              time={time}
              onSelect={(time) => updateOptions({ time })}
            />
          </InputGroup>
          <InputGroup>
            <TagsArea
              placeholder="Tags"
              onChange={(e) => handleTags(e.target.value)}
              value={tags}
            />
            <Button disabled={sendButtonDisabled} onClick={sendBookmark}>
              Send
            </Button>
          </InputGroup>
        </Wrapper>
      </MainContent>
    </Header>
  );
};

export default SaveBookmarkMenu;
