const settings = document.querySelector('.settings')
const widthInput = document.querySelector('#width')
const heightInput = document.querySelector('#height')
const png = document.querySelector('#png')
const jpeg = document.querySelector('#jpeg')
const webp = document.querySelector('#webp')

getSettings()

widthInput.oninput = () => {
    chrome.storage.local.set({width: widthInput.value})
    refresh = true
}

heightInput.oninput = () => {
    chrome.storage.local.set({height: heightInput.value})
    refresh = true
}

png.oninput = () => {
    chrome.storage.local.set({format: 'png'})
    refresh = true
}

jpeg.oninput = () => {
    chrome.storage.local.set({format: 'jpeg'})
    refresh = true
}

webp.oninput = () => {
    chrome.storage.local.set({format: 'webp'})
    refresh = true
}

function getSettings() {
    chrome.storage.local.get(["url", "width", "height", "format"], function(res) {
        if(res.url) {
            downloadLink.href = res.url
            outputImage.src = res.url
        }
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