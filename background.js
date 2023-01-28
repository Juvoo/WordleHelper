const tileClassName = 'Tile-module_tile__UWEHN'
const wordleURL = 'https://www.nytimes.com/games/wordle/index.html'

function getUsedLetters(tab) {
    let tiles = tab.document.getElementsByClassName(tileClassName)
    let usedLetters = []

    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i]
        if (tile.data.get('data-state').toString() === 'absent') {
            usedLetters.push(tiles[i].innerText)
        }
    }
    return usedLetters
}

function injection(tab) {
    console.log('injecting...')
    let tiles = tab.document.getElementsByClassName(tileClassName)

    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i]

        tile.addEventListener("DOMCharacterDataModified", function (event) {
            if (getUsedLetters(tab).includes(tile.innerText)) {
                console.log('new letter: ' + tile.innerText + ', used letters: ' + getUsedLetters())
                event.stopPropagation()
            }
        }, false);
    }
    console.log('injected')
}

function injectWordleHelper(tab) {
    tab.document.onDOMContentLoaded().addListener(function() { injection(tab) })
}

function newTab(tab) {
    console.log(tab.url)

    if (tab.url === wordleURL) {
        console.log('tab is wordle')
        injectWordleHelper(tab)
        console.log('injected')
    }
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

});

chrome.tabs.onCreated.addListener(function(tab) {

});