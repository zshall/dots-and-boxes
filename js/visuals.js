/*global $, LINE, BOX_P1, BOX_P2, CalculateScore */

// This file requires jQuery 1.10 or later to run

// Vendor Functions
Array.prototype.getCol = function (col) {
    // Stack Overflow: http://stackoverflow.com/a/7848073
    
    var column = [];
    
    for(var i = 0; i < this.length; i++){
        column.push(this[i][col]);
    }
    
    return column;
};

// Functions
function BoardHTML (board) {
    // Returns the board as an HTML table
    
    var html = '<table id="board">';
    var maxIndexX = board[0].length;
    var maxIndexY = board.length;
    
    for (var i = 0; i < maxIndexY; i++) {
        html += '<tr>';
        
        for (var j = 0; j < maxIndexX; j++) {
            if (!board[i][j])
                html += '<td data-x="' + j + '" data-y="' + i + '">&nbsp;</td>';
            else {
                if (board[i][j] === LINE)
                    html += '<td data-x="' + j + '" data-y="' + i + '" class="connected">&nbsp;</td>';
                else if (board[i][j] === BOX_P1)
                    html += '<td data-x="' + j + '" data-y="' + i + '" class="box1">&nbsp;</td>';
                else if (board[i][j] === BOX_P2)
                    html += '<td data-x="' + j + '" data-y="' + i + '" class="box2">&nbsp;</td>';
                else
                    html += '<td data-x="' + j + '" data-y="' + i + '">&#9632;</td>';
            }
        }
        
        html += '</tr>';
    }
    
    html += '</table>';
    
    // Score table
    var scores = CalculateScore(board);
    html += '<div id="score"><table>';
    html += '<tr class="s-one"><td>Your score:</td><td>' + scores[0] + '</td></tr>';
    html += '<tr class="s-two"><td>My score:</td><td>' + scores[1] + '</td></tr>';
    html += '</div>';
    
    return html;
}

function DrawBoard (board) {
    // Prints the board to the screen
    
    $('#game').html(BoardHTML(board));
}