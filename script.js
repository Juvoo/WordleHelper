function getUsedLetters() {
    let tiles = document.getElementsByClassName('Tile-module_tile__UWEHN')
    let usedLetters = []

    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i]
        if (tile.dataset.state.toString() === 'absent') {
            usedLetters.push(tiles[i].innerText)
            console.log('letter is already used: ' + tiles[i].innerText)
        }
    }
    return usedLetters
}

let tiles = document.getElementsByClassName('Tile-module_tile__UWEHN')
console.log(tiles.length)

for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i]

    tile.addEventListener("DOMAttrModified", function (event) {
        console.log(tile.innerText)
        if (getUsedLetters().includes(tile.innerText)) {
            console.log('new letter: ' + tile.innerText + ', used letters: ' + getUsedLetters())
            event.stopImmediatePropagation()
        }
    }, false)
    console.log('added event listener')
}