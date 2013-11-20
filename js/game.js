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
var DOT = '•';
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

Array.prototype.copy = function() {
    // Stack Overflow: http://stackoverflow.com/a/6082463
    var arr = this.slice(0);
    
    for( var i = 0; i < this.length; i++ ) {
        if( this[i] && this[i].copy ) {
            arr[i] = this[i].copy();
        }
    }
    
    return arr;
};

// Functions
function Board (x, y) {
    // Creates a board with the specified number of dots
    
    x = x * 2 + 1;
    y = y * 2 + 1;
    
    var board = new Array(y);
    var rowEven = new Array(x);
    var rowOdd = new Array(x);
    
    for (var i = 0; i < rowEven.length; i += 2) {
        rowEven[i] = DOT;
    }
    
    for (var k = 0; k < y; k+= 2) {
        board[k] = rowEven.copy();
    }
    
    for (var j = 1; j < y; j += 2) {
        board[j] = rowOdd.copy();
    }
    
    return board;
}

function IsBox (board, x, y) {
    // Given x and y coordinates, find if cardinal neighbors are connected
    
    if (board[y+1][x] && board[y-1][x] && board[y][x+1] && board[y][x-1])
        return true;
    else
        return false;
}

function CheckBoardForNewBoxes (board, alliance) {
    // For each box coordinate, color the box in if it's complete
    
    var moveMade = false;
    
    for (var i = 1; i < board.length; i += 2) {
        for (var j = 1; j < board[0].length; j += 2) {
            if (!board[i][j] && IsBox(board, j, i)) {
                board[i][j] = alliance;
                moveMade = true;
            }
        }
    }
    
    return moveMade;
}

function Connect (board, x, y, alliance) {
    // Draws a line at coordinates [x, y]
    
    board[y][x] = LINE;
    return CheckBoardForNewBoxes(board, alliance);
}

function IsConnected (board, x1, y1, x2, y2) {
    // Returns whether a line has been drawn between two points
    
    var midx = (x1 + x2) / 2;
    var midy = (y1 + y2) / 2;
    
    return board[midy][midx];
}

function FindAllAvailableMoves (board) {
    // Returns a list of coordinates of all unconnected dot pairs
    
    var moves = [];
    
    for (var i = 1; i < board[0].length; i += 2) {
        for (var j = 0; j < board.length; j += 2) {
            if (!board[j][i])
                moves.push([i,j]);
        }
    }
	
	for (var k = 0; k < board[0].length; k += 2) {
        for (var l = 1; l < board.length; l += 2) {
            if (!board[l][k])
                moves.push([k,l]);
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
        neighbors.push([x+2, y]);
        if (y + 2 <= maxIndexY) neighbors.push([x+2, y+2]);
        if (y - 2 >= 0) neighbors.push([x+2, y-2]);
    }
    
    if (x - 2 >= 0) {
        neighbors.push([x-2, y]);
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
    
    for (var i = 1; i < board[0].length; i += 2) {
        for (var j = 1; j < board.length; j += 2) {
            if (board[j][i] == BOX_P1) scores[0]++;
            else if (board[j][i] == BOX_P2) scores[1]++;
        }
    }
    
    return scores;
}

function Score2 (oldScore, newScore, alliance, max) {
    // Heuristic function that scores a score based on a set of rules.
    
    var a = 1;
    var oa;
    
    if (alliance == BOX_P1) a = 0;
    if (a === 0) oa = 1;
    else oa = 0;
    
    var opp = newScore[oa];
    var you = newScore[a];
    var oopp = oldScore[oa];
    var oyou = oldScore[a];
    
    return (you - oyou) - (opp - oopp);
}

function AIRandom (board, alliance, moves) {
    // Given a choice of all available moves, this AI takes a random one
    
    // Algorithm notes:
    // Wins: 0, losses: 10 (vs. me)
    // Comments: this is a terrible AI. It does everything at random and is easily beatable.
    
    var move = moves.randomItem();
    return Connect(board, move[0], move[1], alliance);
}

function AIGreedy (board, alliance, moves) {
    // This AI will move at random unless it finds a move that will increase its score
    
    // Algorithm notes:
    // Wins: 0, losses: 4 (vs. Smart Dots)
    /* Comments: this AI is only good if the opponent is moving entirely at random.
                 If you wait long enough it will let you win because it moves at random
                 if it can't find any moves that will immediately increase its score. */
    
    var score = CalculateScore(board);
    var moveMade = false;
	var boxMade = false;
    var a = 1;
    
    if (alliance == BOX_P1) a = 0;
    
    for(var i = 0; i < moves.length; i++) {
        var newBoard = board.copy();
        var move = moves[i];
        
        Connect(newBoard, move[0], move[1], alliance);
        
        var newScore = CalculateScore(newBoard);
        
        if (newScore[a] > score[a]) {
            boxMade = Connect(board, move[0], move[1], alliance);
            moveMade = true;
            break;
        }
    }
    
    if (!moveMade) boxMade = AIRandom(board, alliance, moves);
	
	return boxMade;
}

function AI2Ahead (board, alliance, moves) {
    // Looks at each available move and the score directly following that move,
    // using a genetic algorithm for the highest AI score and the lowest human score.
    
    var score = CalculateScore(board);
    var bestH = -99;
    var bestMoves;
    
    var candidates = [];
    var max = 0;
    
    var a = 1;
    var otherAlliance = BOX_P1;
    var move;
    
    if (alliance == BOX_P1) {
        a = 0;
        otherAlliance = BOX_P2;
    }
    
    for (var i = 0; i < moves.length; i++) {
        var newBoard = board.copy();
        move = moves[i];
        
        var boxMade = Connect(newBoard, move[0], move[1], alliance);
        if (boxMade) AIMove(newBoard, alliance, AIGreedy);
        AIMove(newBoard, otherAlliance, AIGreedy);
        
        candidates.push([CalculateScore(newBoard), move]);
        
        if (move[a] > max) max = move[a];
    }
	
    console.clear();
	
    for (var j = 0; j < candidates.length; j++) {
        var h = Score2(score, candidates[j][0], alliance, max);
		console.log(JSON.stringify(score) + '\t' + JSON.stringify(candidates[j][0]) + '\t' + JSON.stringify(candidates[j][1]) + '\t' + h);
        if (h > bestH) {
            bestH = h;
            bestMoves = [candidates[j][1]];
        }
        else if (h == bestH) {
            bestMoves.push(candidates[j][1]);
        }
    }
    
    if (bestMoves) {
        var bestMove = bestMoves.randomItem();
		console.log(JSON.stringify(score) + '\t' + JSON.stringify(bestMoves) + '\t' + bestH);
        return Connect(board, bestMove[0], bestMove[1], alliance);
    }
    else
        return AIRandom(board, alliance, moves);
}

function AIMove (board, alliance, moveAlgorithm) {
	// Continue making moves until AI's turn is up
	var notDone = false;
	do {
        var moves = FindAllAvailableMoves(board);
        if (moves.length === 0) break;
		notDone = moveAlgorithm(board, alliance, moves);
	} while (notDone);
}