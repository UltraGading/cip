async function start() {
    const current = await chrome.windows.getCurrent();
  
    const allTabs = await chrome.tabs.query({});
    allTabs.forEach((tab) => {
      if (tab.windowId != current.id) {
        chrome.tabs.move(tab.id, {
          windowId: current.id,
          index: tab.index
        });
      }
    });
}
chrome.action.onClicked.addListener(start);