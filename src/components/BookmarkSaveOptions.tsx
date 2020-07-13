import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TimeIcon from "./Icons/TimeIcon";
import InterestIcon from "./Icons/InterestIcon";
import useFirestorePagesCollection from "./Firebase/useFirestorePagesCollection";

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

const Label = styled.label`
  margin: 0 0 3px 4px;
  display: block;
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

const InputWrapper = styled.div`
  width: 50%;
  margin-left: -4px;
`;

const InputGroup = styled.div`
  display: flex;
`;

interface IconWrapperProps {
  selected: boolean;
}

const IconWrapper = styled.button<IconWrapperProps>`
  display: inline-block;
  padding: 4px 4px 2px 4px;

  border: 1px solid transparent;
  border-color: ${(props) => props.selected && mainColor};
  border-radius: 15px;
  font: inherit;
  color: inherit;
  background-color: transparent;
  outline: none;

  &:hover {
    cursor: pointer;
    border-color: ${mainColor};
  }

  &:active {
    transform: translateY(1px);
    filter: saturate(150%);
  }
`;


interface BookmarkOptions {
  time: string;
  interest: string;
  tags: string;
}

interface BookmarkOptionsPatch {
  time?: string;
  interest?: string;
  tags?: string;
}

const useBookmarkOptions = (): [BookmarkOptions, (patch: BookmarkOptionsPatch) => void] => {
  const [options, setOptions] = useState({
    time: '',
    interest: '',
    tags: ''
  });

  const update = (optionsPatch: { time?: string, tags?: string, interest?: string }) =>
    setOptions(Object.assign({}, options, optionsPatch));

  return [options, update];
};

const useActiveTabDetails = () => {
  const [details, set] = useState({ url: '', title: '' });

  useEffect(() => {
    if (!isExtension) {
      console.log("You should go to the extension to add pages");
      return;
    }

    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      (tabs) => {
        set({
          url: tabs[0].url || '',
          title: tabs[0].title || ''
        });
      }
    );
  });

  return details;
};

const InterestOption = ({ interest, selected, onSelect }: { interest: string, selected: boolean, onSelect: () => void }) => (
  <IconWrapper selected={selected} onClick={onSelect}>
    <InterestIcon status={interest} />
  </IconWrapper>
);
const InterestSelect = ({ interest, onSelect }: { interest: string, onSelect: (interest: string) => void }) => (
  <InputWrapper>
    <Label>Interest:</Label>
    <InterestOption interest="small" selected={interest === 'small'} onSelect={() => onSelect('small')} />
    <InterestOption interest="medium" selected={interest === 'medium'} onSelect={() => onSelect('medium')} />
    <InterestOption interest="high" selected={interest === 'high'} onSelect={() => onSelect('high')} />
  </InputWrapper>
);

const SaveBookmarkMenu: React.FC = () => {
  const [options, updateOptions] = useBookmarkOptions();
  const handleTime = (time: string) => updateOptions({ time });
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
      interest: options.interest,
      tags: options.tags.split(", "),
      time: options.time,
      title,
      url,
      archived: false,
    });
  };

  return (
    <Header>
      <MainContent>
        <Span>Save this page</Span>
        <Wrapper>
          <InputGroup>
            <InputWrapper>
              <Label>Read Time:</Label>
              <IconWrapper
                selected={options.time === "small"}
                onClick={() => handleTime("small")}
              >
                <TimeIcon status="small" />
              </IconWrapper>
              <IconWrapper
                selected={options.time === "medium"}
                onClick={() => handleTime("medium")}
              >
                <TimeIcon status="medium" />
              </IconWrapper>
              <IconWrapper
                selected={options.time === "high"}
                onClick={() => handleTime("high")}
              >
                <TimeIcon status="high" />
              </IconWrapper>
            </InputWrapper>
            <InterestSelect interest={options.interest} onSelect={interest => updateOptions({ interest })} />
          </InputGroup>
          <InputGroup>
            <TagsArea placeholder="Tags" onChange={e => handleTags(e.target.value)} value={options.tags} />
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
