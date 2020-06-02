declare var chrome: any;

const getUrl = () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs: any) => {
    let url = tabs[0].url;
    alert(url);
    // use `url` here inside the callback because it's asynchronous!
  });
};

export default getUrl;
