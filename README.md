dots-and-boxes
==============

An online version of the popular pen-and-paper game featuring an AI opponent.

Move algorithms implemented
---------------------------

The AI opponent will play at various levels of skill depending on which core algorithm is in use. Some algorithms build on each other, but all eventually go back to `AIRandom` if they can't work their magic.

* `AIRandom`: This isn't so much of an artificial intelligence as it is a random mover. You could probably beat this algorithm on accident. If any more complicated algorithms fail, this one is used to guarantee that at least something happens.

* `AIGreedy`: A noticable improvement over `AIRandom` but still pretty easy to defeat if you know how. This one tends to let you win if you play defensively. Just don't open up any spaces for it to take and take any of the open spaces it leaves for you and you should be alright. If you don't pay attention it can get you though.

* `AI2Ahead`: This is the first algorithm that could beat Beginner Smart Dots, the 1990s dots and boxes game that I've been using to test the effectiveness of my algorithms. I'm pretty sure any human player can beat Beginner Smart Dots, though, and I haven't tested this AI on Intermediate Smart Dots yet so I'm not sure how great it is yet, but true to its name, `AI2Ahead` looks ahead two moves and uses a heuristic evaluation function to determine which move (if any) is best. If it doesn't find any, it picks one at random.

Future algorithms
-----------------

* `AINAhead` will look ahead `n` moves. If the board is small enough that the game's entire state space can be represented in the computer, I expect to get pretty good performance out of this one, but of course it won't scale well. (No looking ahead thousands of moves.)

* `AIDoubleCross` will implement the "Double Crossing" strategy explained in Elwyn Berlekamp's _The Dots and Boxes Game: Sophisticated Child's Play_. This should be more effective for large boards than looking ahead many moves, as it's a specific strategy that is useful for dots and boxes itself, not just a general computing algorithm.

Technologies used
-----------------

(In order of how great an impact they played)

* __JavaScript!__
* CSS
* jQuery
* HTML5

Thanks to
---------

* Dr. Tom Allen, Furman University
* Furman University Computer Science Department
* Stack Overflow