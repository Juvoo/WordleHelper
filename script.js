// Returns an array of letters that have been marked as absent in solution word
function getUsedLetters() {
    // Get tiles in game board
    let tiles = document.getElementsByClassName('Tile-module_tile__UWEHN')
    let usedLetters = []
    let presentLetters = []

    // Iterate through tiles to get present letters
    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i]

        if (tile.innerText === null || tile.innerText === '') break

        // Get letter of tile
        let letter = tile.innerText.toLowerCase()
        // If tile is not in absent state or tbd state add to presentLetters
        if (tile.dataset.state.toString() !== 'absent' && tile.dataset.state.toString() !== 'tbd') {
            presentLetters.push(letter)
        }
    }

    // Iterate through tiles to get used letters
    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i]

        if (tile.innerText === null || tile.innerText === '') break

        // Get letter of tile
        let letter = tile.innerText.toLowerCase()
        // If tile is in absent state and presentLetters doesn't include the letter add to used letters
        if (tile.dataset.state.toString() === 'absent' && !presentLetters.includes(letter)) {
            usedLetters.push(letter)
        }
    }

    return usedLetters
}

// Presses the backspace button on the game board to instantly delete typed letter
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
    // Add mutation observer to each tile element to watch for user typing
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'aria-label') {
                // If aria label has changed
                if (mutation.oldValue !== mutation.target.getAttribute('aria-label')) {
                    // If used letters contains current letter in tile, delete letter
                    if (getUsedLetters().includes(mutation.target.innerText.toString().toLowerCase())) {
                        pressBackspace()
                    }
                }
            }
        })
    })

    // Get tiles in game board
    const targetElements = document.getElementsByClassName('Tile-module_tile__UWEHN')

    // Add mutation observer for each tile
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

// Wait for tile elements to load, then add mutation observers
const timer = setInterval(() => {
    if (tileElementsLoaded()) {
        clearTimeout(timer);
        observeTileElements()
    }
}, 1)