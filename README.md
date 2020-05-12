### Athena

Trying to build a chess database for Mac.

Current state: reads a PGN file (single game) and allows play through of primary variation with back/forward buttons 

Current Task:
    Movetext
        * move numbers (interactive move input)

Features:

    * ECO code indicator
    * stockfish integration with analysis window
    * multi-game window support 
    * RAV support
    * Edit variations, add commentary, NAGs, etc.
    * Save back to PGN
    * Search by position, search by player

### Setup etc.

* Install LTS [node.js](https://nodejs.org/en/download/)
* Install dependencies with `npm install`
* Run development mode `npm run dev`
* Build a package `npm run dist`

