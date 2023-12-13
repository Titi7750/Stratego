function strategoGame() {
    
  return {

    board: initializeBoard,  

    pieceTypes: [
      { rank: 10, name: "Maréchal", count: 1, color: "red" },
      { rank: 9, name: "Général", count: 1 , color: "blue"  },
      { rank: 8, name: "Colonel", count: 2 , color: "green"  },
      { rank: 7, name: "Commandant", count: 3 , color: "yellow"  },
      { rank: 6, name: "Capitaine", count: 4 , color: "brown"  },
      { rank: 5, name: "Lieutenant", count: 4 , color: "purple"  },
      { rank: 4, name: "Sergent", count: 4 , color: "grey"  },
      { rank: 3, name: "Démineur", count: 5 , color: "pink"  },
      { rank: 2, name: "Éclaireur", count: 8 , color: "orange"  },
      { rank: 1, name: "Espion", count: 1 , color: "black"  },
      { rank: 0, name: "Drapeau", count: 1 , color: "beige"  },
      { rank: 11, name: "Bombe", count: 6 , color: "lila"  },
    ],

    winner: null,

    handleBoardClick(event) {

        const row = event.target.dataset.row;
        const col = event.target.dataset.col; 
        this.board[row][col].piece = this.selectedPiece;

        console.log(this.selectedPiece);
        console.log(this.board[row][col].piece);
        console.log(this.selectedPiece)

    },

    selectPiece(piece) {

        this.selectedPiece = piece;
        console.log(this.selectedPiece);

    },

    placeSelectedPiece() {

        // Place the selected piece on the board (displays the piece on the board with the appropriate color)
        this.board[row][col].piece = this.selectedPiece;
        console.log(this.board[row][col].piece);

        // Reset the selected piece
        
    },
  };
}

function initializeBoard() {

    const rows = 10;
    const columns = 10;
    const board = [];

    // Helper function to determine if a cell is part of the middle sections (empty of board pieces)
    const isMiddleCell = (row, col) => {
        const middleRows = [5, 6]
        const middleCols =  [1, 2, 5, 6, 9, 10];
        return middleRows.includes(row) && middleCols.includes(col);
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            board.push({
                type: isMiddleCell(row, col) ? 'middle-square' : 'square',
                row: row,
                col: col,
                piece: null,
            });
        }
    }
    console.log(board);

    return {
        board: board,
    }

}