/*
Proficiency:
Easy = 1
medium = 2
Hard = 3
*/

var proficiency = 1;
data = [{"from_row":2,"from_col":3,"to_row":8,"to_col":5,"captures":[[7,4],[5,2],[3,2]],"gain":4,"val":2,"board":[[0,0,0,0,0,0,0,0,0],[0,3,1,3,1,3,1,3,1],[0,1,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,2,3,0,3,1,3,0,3],[0,3,-1,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,2,3,0],[0,0,3,0,3,0,3,2,3]]},{"from_row":2,"from_col":7,"to_row":8,"to_col":5,"captures":[[7,6],[5,6],[3,6]],"gain":4,"val":4,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,0],[0,0,3,1,3,0,3,0,3],[0,3,1,3,0,3,0,3,0],[0,1,3,0,3,-1,3,1,3],[0,3,0,3,0,3,2,3,1],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,2,3]]},{"from_row":2,"from_col":3,"to_row":8,"to_col":1,"captures":[[7,2],[5,4],[3,4]],"gain":4,"val":8,"board":[[0,0,0,0,0,0,0,0,0],[0,3,1,3,0,3,1,3,1],[0,1,3,-1,3,0,3,1,3],[0,3,0,3,0,3,0,3,0],[0,0,3,-1,3,0,3,0,3],[0,3,0,3,0,3,0,3,2],[0,0,3,0,3,0,3,2,3],[0,3,0,3,0,3,0,3,2],[0,0,3,0,3,0,3,0,3]]},{"from_row":4,"from_col":3,"to_row":8,"to_col":7,"captures":[[7,6],[5,4]],"gain":3,"val":3,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,0],[0,1,3,0,3,0,3,0,3],[0,3,0,3,0,3,-2,3,1],[0,1,3,0,3,0,3,2,3],[0,3,2,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":1,"from_col":8,"to_row":7,"to_col":6,"captures":[[6,7],[4,7],[2,7]],"gain":3,"val":1,"board":[[0,0,0,0,0,0,0,0,0],[0,3,1,3,0,3,1,3,1],[0,1,3,1,3,-1,3,0,3],[0,3,0,3,0,3,2,3,1],[0,0,3,0,3,1,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":4,"from_col":3,"to_row":8,"to_col":7,"captures":[[7,6],[5,4]],"gain":3,"val":4,"board":[[0,0,0,0,0,0,0,0,0],[0,3,1,3,0,3,1,3,1],[0,1,3,1,3,-1,3,0,3],[0,3,0,3,0,3,2,3,1],[0,0,3,0,3,1,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":6,"from_col":5,"to_row":2,"to_col":5,"captures":[[3,4],[5,4]],"gain":3,"val":1,"board":[[0,0,0,0,0,0,0,0,0],[0,3,1,3,0,3,1,3,1],[0,1,3,1,3,-1,3,0,3],[0,3,0,3,0,3,2,3,1],[0,0,3,0,3,1,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":4,"from_col":5,"to_row":8,"to_col":5,"captures":[[7,6],[5,6]],"gain":3,"val":1,"board":[[0,0,0,0,0,0,0,0,0],[0,3,1,3,0,3,1,3,1],[0,1,3,1,3,-1,3,0,3],[0,3,0,3,0,3,2,3,1],[0,0,3,0,3,1,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":4,"from_col":1,"to_row":8,"to_col":1,"captures":[[7,2],[5,2]],"gain":3,"val":114,"board":[[0,0,0,0,0,0,0,0,0],[0,3,1,3,0,3,1,3,1],[0,1,3,-1,3,0,3,1,3],[0,3,0,3,0,3,0,3,0],[0,0,3,-1,3,0,3,0,3],[0,3,0,3,0,3,0,3,2],[0,0,3,0,3,0,3,2,3],[0,3,0,3,0,3,0,3,2],[0,0,3,0,3,0,3,0,3]]},{"from_row":2,"from_col":5,"to_row":4,"to_col":7,"captures":[[5,6],[5,4],[3,4]],"gain":3,"val":11,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,0],[0,1,3,-2,3,-1,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,-2,3,0,3]]},{"from_row":4,"from_col":5,"to_row":8,"to_col":5,"captures":[[7,6],[5,6]],"gain":3,"val":-3,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,-2,3,0,3,0,3,2],[0,0,3,2,3,1,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":7,"from_col":6,"to_row":5,"to_col":8,"captures":[[4,7],[4,5],[6,5]],"gain":3,"val":5,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,1],[0,1,3,-2,3,0,3,0,3],[0,3,0,3,2,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":4,"from_col":5,"to_row":8,"to_col":5,"captures":[[7,6],[5,6]],"gain":3,"val":4,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,1],[0,1,3,-2,3,0,3,0,3],[0,3,0,3,2,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":4,"from_col":3,"to_row":8,"to_col":3,"captures":[[7,4],[5,4]],"gain":3,"val":7,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,1],[0,1,3,-2,3,0,3,0,3],[0,3,0,3,2,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":1,"from_col":4,"to_row":7,"to_col":2,"captures":[[6,3],[4,3],[2,3]],"gain":3,"val":-1,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,1],[0,1,3,-2,3,0,3,0,3],[0,3,0,3,2,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":6,"from_col":7,"to_row":2,"to_col":7,"captures":[[3,6],[5,6]],"gain":3,"val":3,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,1],[0,1,3,-2,3,0,3,0,3],[0,3,0,3,2,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":6,"from_col":5,"to_row":8,"to_col":7,"captures":[[7,6]],"gain":3,"val":1,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,0],[0,1,3,-2,3,-1,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,-2,3,0,3]]},{"from_row":1,"from_col":2,"to_row":1,"to_col":6,"captures":[[2,5],[2,3]],"gain":3,"val":-1,"board":[[0,0,0,0,0,0,0,0,0],[0,3,1,3,0,3,1,3,1],[0,1,3,1,3,-1,3,0,3],[0,3,0,3,0,3,2,3,1],[0,0,3,0,3,1,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":7,"from_col":4,"to_row":1,"to_col":6,"captures":[[2,5],[4,3],[6,3]],"gain":3,"val":106,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,1,3,2,3,1],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,-1,3,0],[0,1,3,0,3,0,3,0,3],[0,3,-1,3,0,3,0,3,0],[0,0,3,0,3,1,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]},{"from_row":4,"from_col":7,"to_row":2,"to_col":5,"captures":[[3,6]],"gain":2,"val":107,"board":[[0,0,0,0,0,0,0,0,0],[0,3,0,3,0,3,0,3,0],[0,1,3,0,3,0,3,0,3],[0,3,0,3,0,3,-2,3,1],[0,1,3,0,3,0,3,2,3],[0,3,2,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3],[0,3,0,3,0,3,0,3,0],[0,0,3,0,3,0,3,0,3]]}]
console.log("learn mode")
console.log(data.length)

var hard = [0,1,2,3,4,5]
var meduim = [6,7,8,9,10,11]
var easy = [12,13,14,15,16,17,18,19]
var shuffled = false
var shuffledState;
var odd = true;
var index;
function shuffleBoard()
{
    shuffled = true;
    console.log("Shuffling......")
    
    if(proficiency==1)
    {
        index = easy[Math.floor(Math.random() * easy.length)];
        console.log(index)
        shuffledState = data[index];
        console.log("Easy proficiency level")
        console.log(shuffledState.board)
        displayShuffledBoard(shuffledState.board)
    }
    else if(proficiency == 2)
    {
        index = medium[Math.floor(Math.random() * medium.length)];
        console.log(index)
        shuffledState = data[index];
        console.log("Medium proficiency level")
        displayShuffledBoard(shuffledState.board)
    }
    else if(proficiency == 3)
    {
        index = hard[Math.floor(Math.random() * hard.length)];
        console.log(index)
        shuffledState = data[index];
        console.log("Hard proficiency level")
        displayShuffledBoard(shuffledState.board)
    }
}
function displayShuffledBoard(shuffledboard)
{
    $("#checkers").fadeOut();
    $("#checkers").fadeIn();
    setTimeout(() => {board.reset_board(shuffledboard); render_board(board); }, 500);
   
}
function reviewUserMove(userTo, userFrom)
{
    console.log("reviewing user's move")
    var bestFrom = parseInt(shuffledState.from_row,10)*10 + shuffledState.from_col;
    var bestTo = parseInt(shuffledState.to_row,10)*10 + shuffledState.to_col;
    console.log("user from: "+userFrom)
    console.log("User to: "+userTo)
    console.log("Best from: "+bestFrom)
    console.log("Best to:", bestTo)
    actualMistakeList = board.get_mistakes()
    if((userFrom == bestFrom && userTo == bestTo) || actualMistakeList.length==0)
    {
        $('#win').text("Correct move")
        text = "Summary= gain: "+shuffledState.gain;
        var btn = document.getElementById("analyse")
        btn.style.display = "none";
    }
    else
    {   
        $('#win').text("Wrong move")
        text = "Summary= gain lost: "+shuffledState.gain;
        //prepare mistake summary
        console.log("inside else")
        console.log(index)
        var move_dict ={ 
        from_row: shuffledState.from_row, 
        from_col: shuffledState.from_col, 
        to_row: shuffledState.to_row, 
        to_col: shuffledState.to_col, 
        captures: shuffledState.captures
        };
        mistakeList = [{'move': move_dict ,'board':shuffledState.board, 'gain_lost': shuffledState.gain }];
        console.log("inside reviewUSer move")
        
        if(mistakeList.length == actualMistakeList.length)
            console.log(mistakeList.length)
            console.log(mistakeList)
    }
   
    $('#winbody').children("p").text(text)
    var btn = document.getElementById("win_undo")
    btn.style.display = "none";

    var modal = document.getElementById("winMessageModal");
	modal.style.display = "block";
    
}