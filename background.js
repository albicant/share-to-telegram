var shareToTelegramTabId = null;
var curTabId = null;

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
        shareToTelegramTabId = null;
        browser.tabs.update(
            curTabId, {
                active: true
            }
        );
        curTabId = null;
    }
}

browser.browserAction.onClicked.addListener((currentTab) => {
    curTabId = currentTab.id;
    shareToTelegram(currentTab.url);
});
browser.tabs.onUpdated.addListener(handleUpdated);
