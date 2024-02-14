document.addEventListener('DOMContentLoaded', function () {
    const generateBoardPieces = document.querySelector(".generate");
    let board = document.querySelector('.board');
    let containerChoosenPieces = document.querySelector('.containerChoosenPieces');
    let selectedPieces = document.querySelector('.selectedPiece');
    let placePiece = document.querySelector('.placePiece');
    let choosenPiece = document.querySelector('.choosenPiece ');
    let play = document.querySelector('.play');
    let playing = false;
    let count = 0;
    let piecesToPlay = [];
    let piecesObjects;

    //Generate board
    function generateBoard() {
        const numRows = 10; // lines
        const numCols = 10; // columns

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                let square = document.createElement('div');
                square.classList.add('square');

                square.setAttribute('data-row', row);
                square.setAttribute('data-col', col);

                let piece = document.createElement('div');
                piece.classList.add('piece');

                let namePiece = document.createElement('p');
                namePiece.classList.add('namePiece');

                let pointPiece = document.createElement('p');
                pointPiece.classList.add('pointPiece');

                piece.appendChild(namePiece);
                piece.appendChild(pointPiece);
                square.appendChild(piece);
                board.appendChild(square);
            }
        }
    }
    generateBoard();

    // Fetch hint api 
    async function fetchPieces() {
        piecesObjects = [];
        const r = await fetch('http://127.0.0.1:3000/hints',
            {
                method: 'GET',
                headers: {
                    "Accept": "application/json"
                }
            });

        // insert into piecesObjets the linePieces
        if (r.ok === true) {
            const piecesNames = await r.json();
            for (let i = 0; i < piecesNames.length; i++) {
                const linePiece = piecesNames[i];
                for (let i = 0; i < linePiece.length; i++) {
                    piecesObjects.push(linePiece[i]);
                }
            }
        }
    }

    // Generate choosen pieces
    async function generateChoosenPieces() {
        await fetchPieces();
        for (let i = 0; i < 40; i++) {
            let square2 = document.createElement('div');
            square2.classList.add('square2');

            let piece2 = document.createElement('div');
            piece2.classList.add('piece2');

            let namePiece2 = document.createElement('p');
            namePiece2.classList.add('namePiece2');

            let pointPiece = document.createElement('p');
            pointPiece.classList.add('pointsPiece2');

            namePiece2.textContent = piecesObjects[i].piece.name;
            pointPiece.textContent = piecesObjects[i].piece.points;

            piece2.appendChild(namePiece2);
            piece2.appendChild(pointPiece);
            square2.appendChild(piece2);
            selectedPieces.appendChild(square2);
        }
        takeValue();
    }
    generateChoosenPieces()

    //Function to take value of the clicked pieces on the bottom board
    function takeValue() {
        let squares2 = document.querySelectorAll('.square2');
        squares2.forEach(function (square) {
            square.addEventListener('click', function () {
                choosenPiece.classList.remove('hidden');
                let namePiece = square.querySelector('.namePiece2').textContent;
                let pointPiece = square.querySelector('.pointsPiece2').textContent;
                let namePieceSelected = document.querySelector('.namePieceSelected');
                let pointsPieceSelected = document.querySelector('.pointsPieceSelected');
                namePieceSelected.textContent = namePiece;
                pointsPieceSelected.textContent = pointPiece;
            })
        })
    }

    //Select the place to insert the piece on the top board
    let squares = document.querySelectorAll('.square');
    squares.forEach(function (square) {

        square.addEventListener('click', function () {
            if (!playing) {
                playing = 0;
                // remove class 'squareSelected'
                squares.forEach(function (s) {
                    s.classList.remove('squareSelected');
                });
                // add class 'squareSelected' on the clicked piece
                square.classList.add('squareSelected');

                //If playing, user can selected two pieces
            } else if (playing) {
                count++;
                square.classList.add('squareSelected');
                if (count === 3) {
                    squares.forEach(function (s) {
                        s.classList.remove('squareSelected');
                        count = 0;
                    });
                }
            }
        })
    })

    //insert the value of choosenPiece in the selectedPiece if it has squareSelectedPiece class
    for (let i = 0; i < 40; i++) {
        squares[i].classList.add('pieceToPlay');
        piecesToPlay.push(squares[i])
    }

    placePiece.addEventListener('click', () => {
        let namePieceSelected = document.querySelector('.namePieceSelected').textContent;
        let pointsPieceSelected = document.querySelector('.pointsPieceSelected').textContent;
        piecesToPlay.forEach((e) => {
            if (e.classList.contains('squareSelected')) {
                let placeToInsertName = e.querySelector('.namePiece ');
                let placeToInsertPoint = e.querySelector('.pointPiece');
                placeToInsertName.textContent = namePieceSelected;
                placeToInsertPoint.textContent = pointsPieceSelected;
                e.classList.add('pieceToPlayOnBoard')
            }
        })
    })

    // Function to update the board after fetching pieces
    async function updateBoard() {
        await fetchPieces();
        let pieceNameToInsert = Array.from(document.querySelectorAll('.namePiece'));
        let piecePointToInsert = Array.from(document.querySelectorAll('.pointPiece'));
        let piecesToPlay = document.querySelectorAll('.pieceToPlay')

        // Update the board with the fetched pieces
        for (let i = 0; i < 40; i++) {
            pieceNameToInsert[i].textContent = piecesObjects[i].piece.name;
            piecePointToInsert[i].textContent = piecesObjects[i].piece.points;
            if (pieceNameToInsert[i] !== "" && piecePointToInsert !== "") {
                piecesToPlay[i].classList.add('pieceToPlayOnBoard');
            }
        }
    }
    
    async function otherPlayer(){
        await fetchPieces();

        let pieceNameToInsert = Array.from(document.querySelectorAll('.namePiece'));
        pieceNameToInsert.reverse();

        let squares = Array.from(document.querySelectorAll('.square'));
        console.log(squares);

        let piecePointToInsert = Array.from(document.querySelectorAll('.pointPiece'));
        piecePointToInsert.reverse();

        // Update the board with the fetched pieces
        for (let i = 0; i < 40; i++) {
            pieceNameToInsert[i].textContent = piecesObjects[i].piece.name;
            piecePointToInsert[i].textContent = piecesObjects[i].piece.points;
            pieceNameToInsert[i].classList.add('namePieceOtherPlayer');
        }
    }
    otherPlayer();

    //api hints fetch onclick
    generateBoardPieces.addEventListener('click', () => {
        updateBoard();
    })

    // Generate 8 pieces of the two lakes
    function generateLake() {
        squaresLakes = [squares[42], squares[43], squares[52], squares[53], squares[46], squares[47], squares[56], squares[57]];

        for (let i = 0; i < squaresLakes.length; i++) {
            squaresLakes[i].classList.add('lake')
        }
    }
    generateLake();

    //click on th button play: game can begin
    play.addEventListener('click', () => {
        playing = true;
        play.textContent = 'Déplacer le pion';
        containerChoosenPieces.classList.add('none');
        generateBoardPieces.classList.add('none');
        choosenPiece.classList.add('none');

        movePiece();

        squares.forEach(function (s) {
            s.classList.remove('squareSelected');
            count = 0;
        })
    })

    //move piece
    function movePiece() {
        let pieceToMoveName;
        let pieceToMovePoint;
        let pieceToDeleteName;
        let pieceToDeletePoint;
        let classesToDelete = document.querySelectorAll('.pieceToPlayOnBoard');

        squares.forEach(function (e) {
            if (e.classList.contains("squareSelected") && count === 2) {
                let piecesSelectedName = e.querySelectorAll(".namePiece");
                let piecesSelectedPoint = e.querySelectorAll(".pointPiece");

                for (let i = 0; i < piecesSelectedName.length; i++) {
                    if (piecesSelectedName[i].textContent !== "") {
                        pieceToMoveName = piecesSelectedName[i].textContent;
                        pieceToDeleteName = e.querySelector(".namePiece");
                    }
                    if (piecesSelectedName[i].textContent === "") {
                        piecesSelectedName[i].textContent = pieceToMoveName;
                        pieceToDeleteName = pieceToDeleteName.textContent = "";
                    }
                    if (piecesSelectedPoint[i].textContent !== "") {
                        pieceToMovePoint = piecesSelectedPoint[i].textContent;
                        pieceToDeletePoint = e.querySelector(".pointPiece");
                    }
                    if (piecesSelectedPoint[i].textContent === "") {
                        piecesSelectedPoint[i].textContent = pieceToMovePoint;
                        e.classList.add('pieceToPlayOnBoard');
                        pieceToDeletePoint = pieceToDeletePoint.textContent = "";
                    }
                }
                for (let i = 0; i < classesToDelete.length; i++) {
                    if (classesToDelete[i].textContent === "") {
                        classesToDelete[i].classList.remove('pieceToPlayOnBoard');
                    }
                }
            }
        });
    }
});

document.getElementById('deletePlayer').addEventListener('click', () => {
    fetch('http://localhost:3000/games/18', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});