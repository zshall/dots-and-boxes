/*globals $, document, alert, Board, DrawBoard, Connect, IsConnected, BOX_P1, BOX_P2, AIMove, AIRandom, AIGreedy, AI2Ahead*/
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

function StartWaiting() {
	$("body").addClass("wait");
}

function EndWaiting() {
	$("body").removeClass("wait");
}

$(document).ready(function () {
    // Make a new board
    board = Board(5, 5);
    turn = BOX_P1;
    DrawBoard(board);
    
    // Events listing
    
    $(document).on('click', '#board tr:nth-child(odd) td:nth-child(even),#board tr:nth-child(even) td:nth-child(odd)', function() {
        // Mouse event for drawing an edge at a particular coordinate
        StartWaiting();
		var x = $(this).data('x');
		var y = $(this).data('y');
		setTimeout(function() {
			
			if (!board[y][x]) {
				var boxMade = Connect(board, x, y, turn);
				if (!boxMade) {
					FlipTurn();
					//AIMove(board, BOX_P2, AIRandom);
					//AIMove(board, BOX_P2, AIGreedy);
					AIMove(board, BOX_P2, AI2Ahead);
					FlipTurn();
				}
				DrawBoard(board);
			}
			EndWaiting();
		}, 1);
    });
});
