chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: "Download",
        id: "convert-resize-download",
        contexts: ["image"]
    })
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId !== "convert-resize-download") return
    chrome.tabs.sendMessage(tab.id, info.srcUrl, {frameId: info.frameId})
})