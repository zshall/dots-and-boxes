/*global $ */

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
    var maxIndexX = board.length;
    var maxIndexY = board[0].length;
    
    for (var i = 0; i < maxIndexY; i++) {
        var row = board.getCol(i);
        html += '<tr>';
        
        for (var j = 0; j < maxIndexX; j++) {
            if (!row[j]) html += '<td>e</td>';
            else html += '<td>' + row[j] + '</td>';
        }
        
        html += '</tr>';
    }
    
    html += '</table>';
    
    return html;
}

function DrawBoard (board) {
    // Prints the board to the screen
    
    $('#game').html(BoardHTML(board));
}