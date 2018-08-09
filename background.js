function shareToTelegram(data) {
    browser.tabs.create({
        url: 'https://telegram.me/share/url?url=' + data
    });
}

browser.browserAction.onClicked.addListener((currentTab) => {
    shareToTelegram(currentTab.url)
});