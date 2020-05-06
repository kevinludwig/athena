### Athena

Trying to build a chess database for Mac.

1. Current state: it renders a chessboard and accepts legal moves.
2. Short term goals: 
    * read a PGN with one game and allow play-through of primary variation (back/forward buttons)
    * move text view that shows all moves and allows click to specific move
    * stockfish integration with analysis window
3. Medium term goals:
    * read a PGN with many games, game selection window, tabbed view to have multiple games open
    * support PGN with RAV and navigation across all variations
    * in place edit to add variations and commentary, save back to PGN
4. Long term goals: 
    * compare against feature set of SCID and figure out what I want to build
    * minimally, a "database" which could just be a directory of PGNs, with fast search by position, and other filters

### Setup etc.

* Install LTS [node.js](https://nodejs.org/en/download/)
* Install dependencies with `npm install`
* Run development mode `npm run dev`
* Build a package `npm run dist`

