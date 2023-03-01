const canvas = document.createElement("canvas"), dlLink = document.createElement("a")
var imgEl, widthSetting = 0, heightSetting = 0, formatSetting = "png", downloadUrl = ""

document.addEventListener('contextmenu', function (e) {
    if (e.explicitOriginalTarget.tagName !== "IMG") return
    imgEl = e.explicitOriginalTarget
    imgEl.crossOrigin = "Anonymous"
})

// ASYNC MESS AHEAD

chrome.runtime.onMessage.addListener(async function (data, sender) {
    if (!data) return
    // imgEl.src = data
    const settings = await getSettings()
    const resized = resize(await settings)
    const converted = convert(resized)
    if (converted.downloadUrl.length < 10) return
    dlLink.href = converted.downloadUrl
    dlLink.setAttribute(
        "download",
        `${Math.round(converted.widthSetting)}x${Math.round(converted.heightSetting)}.${converted.formatSetting}`
    )
    dlLink.click()
})

async function getSettings() {
    return await chrome.storage.local.get(
        ["width", "height", "format"]).then((res) => {
            if (res.width) {
                widthSetting = res.width
            } else {
                widthSetting = 0
            }
            if (res.height) {
                heightSetting = res.height
            } else {
                heightSetting = 0
            }
            if (res.format) {
                formatSetting = res.format
            }
            return { widthSetting, heightSetting, formatSetting }
        })
}

function resize(settings) {
    widthSetting = settings.widthSetting
    heightSetting = settings.heightSetting
    formatSetting = settings.formatSetting
    if (widthSetting > 0 && heightSetting > 0) {
        return { widthSetting, heightSetting, formatSetting }
    } else if (widthSetting > 0) {
        percent = widthSetting / imgEl.naturalWidth
        heightSetting = imgEl.naturalHeight * percent
        return { widthSetting, heightSetting, formatSetting }
    } else if (heightSetting > 0) {
        percent = heightSetting / imgEl.naturalHeight
        widthSetting = imgEl.naturalWidth * percent
        return { widthSetting, heightSetting, formatSetting }
    } else {
        widthSetting = imgEl.naturalWidth
        heightSetting = imgEl.naturalHeight
        return { widthSetting, heightSetting, formatSetting }
    }
}

function convert(settings) {
    widthSetting = settings.widthSetting
    heightSetting = settings.heightSetting
    formatSetting = settings.formatSetting
    canvas.width = widthSetting
    canvas.height = heightSetting
    canvas.getContext("2d").drawImage(imgEl, 0, 0, widthSetting, heightSetting)
    downloadUrl = canvas.toDataURL(`image/${formatSetting}`)
    return { downloadUrl, widthSetting, heightSetting, formatSetting }
}