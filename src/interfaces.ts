export interface IChromeAPI {
  tabs: {
    query: Function;
  };
  storage: {
    local: {
      get: Function;
      set: Function;
    };
  };
}
