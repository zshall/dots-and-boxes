/*globals $, document, alert, Board, DrawBoard, Connect, IsConnected, BOX_P1, BOX_P2, AIMove, AIRandom*/
// This file requires jQuery 1.10 or later to run

// Globals
var board;
var turn;

function FlipTurn() {
    if (turn === BOX_P1)
        turn = BOX_P2;
    else
        turn = BOX_P1;
}

$(document).ready(function () {
    // Make a new board
    board = Board(5, 3);
    turn = BOX_P1;
    DrawBoard(board);
    
    // Events listing
    
    $(document).on('click', '#board tr:nth-child(odd) td:nth-child(even),#board tr:nth-child(even) td:nth-child(odd)', function() {
        // Mouse event for drawing an edge at a particular coordinate
        
        var x = $(this).data('x');
        var y = $(this).data('y');
        
        if (!board[y][x]) {
            var boxMade = Connect(board, x, y, turn);
            if (!boxMade) {
                FlipTurn();
				//AIMove(board, BOX_P2, AIRandom);
                AIMove(board, BOX_P2, AIGreedy);
				FlipTurn();
			}
            DrawBoard(board);
        }
    });
});
