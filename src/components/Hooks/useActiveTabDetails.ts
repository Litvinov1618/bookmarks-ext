import { useState, useEffect } from "react";

const isExtension = process.env.REACT_APP_IS_EXTENSION;

const useActiveTabDetails = () => {
  const [details, set] = useState({ url: "", title: "" });

  useEffect(() => {
    if (!isExtension) {
      console.log("You should go to the extension to add pages");
      return;
    }

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      set({
        url: tabs[0].url || "",
        title: tabs[0].title || "",
      });
    });
  });

  return details;
};

export default useActiveTabDetails;
