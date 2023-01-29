function getUsedLetters() {
    let tiles = document.getElementsByClassName('Tile-module_tile__UWEHN')
    let usedLetters = []

    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i]
        if (tile.dataset.state.toString() === 'absent') {
            if (tiles[i].innerText === null) break
            usedLetters.push(tiles[i].innerText.toLowerCase())
        }
    }
    return usedLetters
}

function pressBackspace() {
    let buttons = document.getElementsByClassName('Key-module_key__kchQI Key-module_oneAndAHalf__bq8Tw')
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i]
        if (button.getAttribute('data-key') === '←') {
            button.click()
        }
    }
}

function observeTileElements() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'aria-label') {
                console.log(mutation.oldValue + ' ' + mutation.target.ariaLabel)
                if (mutation.oldValue !== mutation.target.ariaLabel) {
                    if (getUsedLetters().includes(mutation.target.ariaLabel)) {
                        pressBackspace()
                    }
                }
            }
        })
    })

    const targetElements = document.getElementsByClassName('Tile-module_tile__UWEHN')

    for (let i = 0; i < targetElements.length; i++) {
        observer.observe(targetElements[i], {
            attributes: true,
            characterData: false,
            childList: false,
            subtree: false,
            attributeOldValue: true,
            characterDataOldValue: false
        })
    }
}

function tileElementsLoaded() {
    return document.getElementsByClassName('Tile-module_tile__UWEHN').length !== 0
}

const timer = setInterval(() => {
    if (tileElementsLoaded()) {
        clearTimeout(timer);
        observeTileElements()
    }
}, 1)