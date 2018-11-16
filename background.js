var shareToTelegramTabId = '';

function shareToTelegram(data) {
    let shareToTelegramTab = browser.tabs.create({
        url: 'https://telegram.me/share/url?url=' + data
    });
    shareToTelegramTab.then((tab) => {
        shareToTelegramTabId = tab.id;
    });
}

function handleUpdated(tabId, changeInfo, tabInfo) {
    if(shareToTelegramTabId == tabId && tabInfo.status == "complete") {
        browser.tabs.remove(shareToTelegramTabId);
        shareToTelegramTabId = '';
    }
}

browser.browserAction.onClicked.addListener((currentTab) => {
    shareToTelegram(currentTab.url)
});
browser.tabs.onUpdated.addListener(handleUpdated);
