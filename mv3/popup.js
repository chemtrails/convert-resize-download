const widthInput = document.querySelector("#width")
const heightInput = document.querySelector("#height")
const png = document.querySelector("#png")
const jpeg = document.querySelector("#jpeg")
const webp = document.querySelector("#webp")

getSettings()

widthInput.oninput = () => {
    chrome.storage.local.set({ width: widthInput.value })
}

heightInput.oninput = () => {
    chrome.storage.local.set({ height: heightInput.value })
}

png.oninput = () => {
    chrome.storage.local.set({ format: "png" })
}

jpeg.oninput = () => {
    chrome.storage.local.set({ format: "jpeg" })
}

webp.oninput = () => {
    chrome.storage.local.set({ format: "webp" })
}

function getSettings() {
    chrome.storage.local.get(["width", "height", "format"], function (res) {
        if (res.width) {
            widthInput.value = res.width
        }
        if (res.height) {
            heightInput.value = res.height
        }
        if (res.format) {
            document.getElementById(res.format).checked = "true"
        }
    })
}