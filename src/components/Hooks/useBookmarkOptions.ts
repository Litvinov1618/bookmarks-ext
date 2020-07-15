import { useState } from "react";

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

const useBookmarkOptions = (): [
  BookmarkOptions,
  (patch: BookmarkOptionsPatch) => void
] => {
  const [options, setOptions] = useState({
    time: "",
    interest: "",
    tags: "",
  });

  const update = (optionsPatch: {
    time?: string;
    tags?: string;
    interest?: string;
  }) => setOptions(Object.assign({}, options, optionsPatch));

  return [options, update];
};

export default useBookmarkOptions;
