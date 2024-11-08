chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const youtubeURL = "https://www.youtube.com/watch?v=";
const youtubeEmbedUrl = "https://www.youtube.com/embed/";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(youtubeURL)) {
    // retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    const videoCode = tab.url.split(youtubeURL)[1];

    let updatedUrl;
    if (nextState === "ON") {
      updatedUrl = `${youtubeEmbedUrl}${videoCode}`;
    } else if (nextState === "OFF") {
      updatedUrl = `${youtubeURL}${videoCode}`;
    }

    chrome.tabs.update(undefined, { url: updatedUrl });
  }
});
