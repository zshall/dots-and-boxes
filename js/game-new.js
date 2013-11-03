// The board is in top-down view style, referenced as [X][Y].
/*
    0   1   2   3   4   5   6
0   x   -   x       x       x
1   |   1   |
2   x   -   x       x       x
3
4   x       x       x       x
*/

// Constants
var BOX_P1 = 'R';
var BOX_P2 = 'B';
var DOT = 'X';
var LINE = '1';

// Vendor Functions
Array.prototype.getUnique = function () {
    // Stack Overflow: http://stackoverflow.com/a/1961068
    var u = {}, a = [];
    
    for(var i = 0, l = this.length; i < l; ++i){
        if(u.hasOwnProperty(this[i])) {
            continue;
        }
        
        a.push(this[i]);
        u[this[i]] = 1;
    }
    
    return a;
};

Array.prototype.randomItem = function () {
    // Stack Overflow: http://stackoverflow.com/a/5915123
    return this[Math.floor(Math.random()*this.length)];
};

Array.prototype.copy = function () {
    // Stack Overflow: http://stackoverflow.com/a/7486130
    return this.slice(0);
};

// Functions
function Board (x, y) {
    // Creates a board with the specified number of dots
    
    x = x * 2 + 1;
    y = y * 2 + 1;
    
    var board = [];
    var row = new Array(y);
    
    for (var i = 0; i < row.length; i += 2) {
        row[i] = DOT;
    }
    
    for (var j = 0; j < x; j++) {
        board.push(row.copy());
    }
    
    return board;
}

function Connect (board, x, y) {
    // Draws a line at coordinates [x, y]
    
    board[x][y] = LINE;
}

function IsConnected (board, x1, y1, x2, y2) {
    // Returns whether a line has been drawn between two points
    
    var midx = (x1 + x2) / 2;
    var midy = (y1 + y2) / 2;
    
    return board[midx][midy];
}

function FindAllAvailableMoves (board) {
    // Returns a list of coordinates of all unconnected dot pairs
    
    var moves = [];
    
    for (var i = 1; i < board.length; i += 2) {
        for (var j = 1; j < board[0].length; j += 2) {
            if (!board[i][j])
                moves.push([i,j]);
        }
    }
    
    return moves;
}

function FindNeighbors (board, x, y) {
    // Given a dot at [x,y], return a list of unconnected neighboring dot coordinates
    
    var neighbors = [];
    var maxIndexX = board.length--;
    var maxIndexY = board[0].length--;
    
    if (x + 2 <= maxIndexX) {
        neighbors.push(board[x+2][y]);
        if (y + 2 <= maxIndexY) neighbors.push([x+2, y+2]);
        if (y - 2 >= 0) neighbors.push([x+2, y-2]);
    }
    
    if (x - 2 >= 0) {
        neighbors.push(board[x-2][y]);
        if (y + 2 <= maxIndexY) neighbors.push([x-2, y+2]);
        if (y - 2 >= 0) neighbors.push([x-2, y-2]);
    }
    
    return neighbors;
}

function FindAvailableNeighbors (board, x, y) {
    // Given a dot at [x,y], return a list of unconnected neighboring dot coordinates
    
    var neighbors = FindNeighbors(board, x, y);
    var validNeighbors = [];
    
    for (var i = 0; i < neighbors.length; i++) {
        var nx = neighbors[i][0];
        var ny = neighbors[i][1];
        
        if (!IsConnected(board, x, y, nx, ny))
            validNeighbors.push([nx,ny]);
    }
    
    return validNeighbors;
}

function CalculateScore (board) {
    // Returns a number based on the current board's score
    
    var scores = [0, 0];
    
    for (var i = 1; i < board.length; i += 2) {
        for (var j = 1; j < board[0].length; j += 2) {
            if (board[i][j] == BOX_P1) scores[0]++;
            else if (board[i][j] == BOX_P2) scores[1]++;
        }
    }
    
    return scores;
}

function AIRandom (board) {
    // Given a choice of all available moves, this AI takes a random one
    
    var moves = FindAllAvailableMoves(board);
    var move = moves.randomItem();
    Connect(board, move[0], move[1]);
}

function AIGreedy (board, alliance) {
    // This AI will move at random unless it finds a move that will increase its score
    
    var moves = FindAllAvailableMoves(board);
    var score = CalculateScore(board);
    var moveMade = false;
    
    for(var i = 0; i < moves.length; i++) {
        var newBoard = board.copy();
        var move = moves[i];
        
        Connect(newBoard, move[0], move[1]);
        
        var newScore = CalculateScore(newBoard);
        
        if (newScore > score) {
            Connect(board, move[0], move[1]);
            moveMade = true;
            break;
        }
    }
    
    if (!moveMade) AIRandom(board);
}




























































