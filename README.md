Battleship

A browser-based implementation of the classic Battleship board game built with vanilla JavaScript, HTML, and CSS. This project was developed as a hands-on exercise in structural object-oriented programming, factory functions, and modular UI state management.
What's Under the Hood

The architecture relies on separated modules to handle data logic and user interface rendering independently:

    Gameboard Logic: Manages a 10x10 grid matrix, handles randomized ship placements with strict boundary/collision validation, and processes incoming attacks.  

    Turn Engine: A centralized game controller that handles turn-switching mechanics between the user and an automated computer opponent.  

    Dynamic UI: Uses native DOM manipulation to render interactive grids, register click-based tracking listeners, and dynamically apply visual states for hits, misses, and ship positions.  

Current Project Status:

The core engines and UI rendering pipelines are mostly intact, but the project is currently frozen in an unfinished state.
What Works:

    Initial 10x10 grid rendering for both players.  

    Randomized ship placement algorithm with proximity rules (preventing ships from being placed directly adjacent to one another).  

    Basic turn execution where user clicks trigger a counter-attack from the script.  

Known Issues / Unfinished Work:

    State Control: The game loop requires tighter state constraints to prevent inputs after a win condition is triggered.  

    Data Structure Scope: Minor scope reference and object destructuring bugs exist within the gameboard's attack-receiving functions.  

Tech Stack

    JavaScript (ES6 Modules)
    HTML5
    CSS3
    Webpack (for module bundling and asset management)
