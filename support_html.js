function showRules(id1, id2)
{
	var e = document.getElementById(id1);
	var s = document.getElementById(id2)
	if(e.style.display == 'block')
	{
		e.style.display = 'none';
		s.innerHTML = "Display Rules" 
	}
	else{
		e.style.display = 'block';	
		s.innerHTML = "Hide Rules"
	}
};


function changeAItoRed()
{
	
			console.log("here AI can become Red");
			/*
			board.is_ai_red = true;
			ai_class = "redPiece";
			player_Class = "blackPiece";
			//ai_turn = true;
			*/
}
function changeAItoBlue()
{
			console.log("here AI can become Blue");
			/*
			board.is_ai_red = false;
			ai_class = "blackPiece";
			player_Class = "redPiece";
			//ai_turn = true;
			*/
}
function showHA(id){
	document.getElementById(id).style.display = 'block';
}
function showAA(id){
	document.getElementById(id).style.display = 'block';
}
function hideHA(id){
	document.getElementById(id).style.display = 'none';
}
function hideAA(id){
	document.getElementById(id).style.display = 'none';
}


function showTable(id1){
	var e = document.getElementById(id1);
	e.style.display = 'block';
	understanding_mode = true;	
};
function hideTable(id1){
	var e = document.getElementById(id1);
	e.style.display = 'none';		

}
function hidePlay(id){
	document.getElementById(id).disabled = false;
}

function hideUnderstand(id){
	document.getElementById(id).disabled = false;
	understanding_mode=false;
}

function disableModes(id1,id2,id3){
	document.getElementById(id1).disabled = true;
	document.getElementById(id2).disabled = true;
	document.getElementById(id3).disabled = true;
}
function disableAImoveBtn(id)
{
	if(id.checked)
	{
		document.getElementById("AIMove").innerHTML = "AI-Move";
		document.getElementById("AIMove").disabled = true;
		document.getElementById("AIvsAI").disabled = true;
		AutoAI = true;
	}
	else
	{
		document.getElementById("AIMove").innerHTML = "AI-Move";
		document.getElementById("AIMove").disabled = false;	
		document.getElementById("AIvsAI").disabled = false;
		AutoAI = false;
	}
}
function disableAImoveBtnAA(id,id1)
{
	if(id.checked)
	{
		document.getElementById("AIMove").disabled = false;
		
		document.getElementById("AIMove").innerHTML = "AI(B)Move";
		document.getElementById("AIAutoMove").disabled = true;
		//AutoAI = true;
	}
	else
	{
		document.getElementById("AIMove").disabled = true;
		document.getElementById("AIMove").innerHTML = "AI-Move";
		document.getElementById("AIAutoMove").disabled = false;	
		//AutoAI = false;
	}
}
function showAIBlueBtn(id)
{
	if(id.checked)
	{
		document.getElementById("RedAIMove").style.display = 'block';
		//AutoAI = true;
	}
	else
	{
		document.getElementById("RedAIMove").style.display = 'none';
		//AutoAI = false;
	}
}


function cellVisibility(id){


	var id;
	if(id.checked){
		for (var i = 1; i <= 8; i++) {
			for (var j = 1; j <= 8; j++) {

				id=i*10 + j;
				document.getElementById("cell"+id).style.visibility="visible";


			}	 
		}
	}
	else{
		for (var i = 1; i <= 8; i++) {
			for (var j = 1; j <= 8; j++) {

				id=i*10 + j;
				document.getElementById("cell"+id).style.visibility="hidden";


			}	 
		}	
	}

};

function difficultyLevel(id)
{
			//MAX_DEPTH=1;
			console.log(board.MAX_DEPTH)
			
			var d = document.getElementById(id);
			id1=d.options[d.selectedIndex].id; 
			console.log(id1) 
			if(id1 == "Medium")
			{
				board.MAX_DEPTH = 4;
				console.log(board.MAX_DEPTH);
			}
			else if(id1 == "Hard"){
				board.MAX_DEPTH = 6;
				console.log(board.MAX_DEPTH);	
			}
			else{
				board.MAX_DEPTH = 1;
				console.log(board.MAX_DEPTH);
			}
			console.log(board.MAX_DEPTH);	
}
		
function setHeuristic(id)
{
			//MAX_DEPTH=1;
			console.log("Hii Heuristic value updated");
			console.log(board.heuristic)
			var d = document.getElementById(id);
			id1=d.options[d.selectedIndex].id;  
			var a=document.getElementById("heuristic_id");
			console.log(a)
			if(id1 == "H1")
			{
				board.heuristic = 1;
				a.innerHTML="<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 2 * (my_king_pieces - opp_king_pieces)";
				console.log(board.heuristic);
			}
			else if(id1 == "H2"){
				board.heuristic = 2;
				a.innerHTML="<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 1.75* (my_king_pieces - opp_king_pieces)";
				console.log(board.heuristic);	
			}
			else if(id1 == "H3"){
				board.heuristic = 3;
				a.innerHTML="<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 1.5 * (my_king_pieces - opp_king_pieces)";
				console.log(board.heuristic);
			}
			else if(id1 == "H4"){
				board.heuristic = 4;
				a.innerHTML="<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 1.25 * (my_king_pieces - opp_king_pieces)";
				console.log(board.heuristic);	
			}
			else if(id1 == "H5"){
				board.heuristic = 5;
				a.innerHTML="<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 1 * (my_king_pieces - opp_king_pieces)";
				console.log(board.heuristic);
			}
			else if(id1 == "H6"){
				board.heuristic = 6;
				a.innerHTML="<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 2.25 * (my_king_pieces - opp_king_pieces)";
				console.log(board.heuristic);	
			}
			else{
				board.heuristic = 7;
				a.innerHTML="<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 2.5 * (my_king_pieces - opp_king_pieces)";
				console.log(board.heuristic);
			}

}

function showPoints()
{
			//Score will come in values variable
			var values=board.show_gains_util();
			console.log(values);
			//Implement this
			var tables = document.getElementById('show_table');
			tables.innerHTML="<tr><td class='show_points'>From Cell</td><td class='show_points'>Gain</td></tr>";
			
			for(var i=0;i<values.length;i++)
			{
				var from_id=values[i].from_row.toString()+values[i].from_col.toString()
				//var to_id=values[i].from_row.toString()+values[i].to_col.toString()
				var gain=values[i].gain.toString()
				tables.innerHTML+="<tr><td class='show_points'>"+from_id+"</td><td class='show_points'>"+gain+"</td></tr>"
			}

			
}

var userHintMove = true;
function showHint()
{
 //make a copy of original board and make changes in cloned board
 	var modal = document.getElementById("myModal");
 
	 $("#modalBody").empty();
	 var modalBoard = $("#checkers").clone();
	 $("#modalBody").append(modalBoard); 
	 $("#modalBoard").addClass("tableClass");
 
	 modal.style.display = "block";
	 $("#reviewHints").prop("disabled","true");
}
var duplicateBoard = new Board(true, false); 
function nextHintMove()
{

	var hints = board.show_user_hint();
	var fromId = hints.from_row*10 + hints.from_col;
	var toId = hints.to_row*10 + hints.to_col;
	var captures = hints.captures;
 	//make copy of board object
 	duplicateBoard = board.copyOf(duplicateBoard);
 	// show which piece to select
 
	 //make from_id to no piece
 
	 board.board[hints.from_row][hints.from_col] = 0;
	 board.board[hints.to_row][hints.to_col] = 1;
 
	 var i;
	 for(i=0;i<captures.length;i++)
	 {
	 	board.board[captures[i][0]][captures[i][1]] = 0;
	 }
	 render_board(board);
	 $("#modalBody").empty();
	 var modalBoard = $("#checkers").clone();
	 $("#modalBody").append(modalBoard); 
	 $("#modalBoard").addClass("tableClass");
 
	 // reset original board of sec2 div
	 board = duplicateBoard.copyOf(board);
	 render_board(board);
 
}

function closeModal()
{
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}
