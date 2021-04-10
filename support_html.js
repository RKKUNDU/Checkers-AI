function showRules(id1, id2) {
	var e = document.getElementById(id1);
	var s = document.getElementById(id2)
	if (e.style.display == 'block') {
		e.style.display = 'none';
		s.innerHTML = "Display Rules"
	}
	else {
		e.style.display = 'block';
		s.innerHTML = "Hide Rules"
	}
};


function changeAItoRed() {

	console.log("here AI can become Red");
	/*
	board.is_ai_red = true;
	ai_class = "redPiece";
	player_Class = "blackPiece";
	//ai_turn = true;
	*/
}
function changeAItoBlue() {
	console.log("here AI can become Blue");
	/*
	board.is_ai_red = false;
	ai_class = "blackPiece";
	player_Class = "redPiece";
	//ai_turn = true;
	*/
}
function showHA(id) {
	document.getElementById(id).style.display = 'block';
}
function showAA(id) {
	document.getElementById(id).style.display = 'block';
}
function hideHA(id) {
	document.getElementById(id).style.display = 'none';
}
function hideAA(id) {
	document.getElementById(id).style.display = 'none';
}


function showTable(id1) {
	var e = document.getElementById(id1);
	e.style.display = 'block';
	understanding_mode = true;
};
function hideTable(id1) {
	var e = document.getElementById(id1);
	e.style.display = 'none';

}
function hidePlay(id) {
	document.getElementById(id).disabled = false;
}

function hideUnderstand(id) {
	document.getElementById(id).disabled = false;
	understanding_mode = false;
}

function disableModes(id1, id2, id3) {
	document.getElementById(id1).disabled = true;
	document.getElementById(id2).disabled = true;
	document.getElementById(id3).disabled = true;
}
function disableAImoveBtn(id) {
	if (id.checked) {
		document.getElementById("AIMove").innerHTML = "AI-Move";
		document.getElementById("AIMove").disabled = true;
		document.getElementById("AIvsAI").disabled = true;
		AutoAI = true;
	}
	else {
		document.getElementById("AIMove").innerHTML = "AI-Move";
		document.getElementById("AIMove").disabled = false;
		document.getElementById("AIvsAI").disabled = false;
		AutoAI = false;
	}
}
function disableAImoveBtnAA(id, id1) {
	if (id.checked) {
		document.getElementById("AIMove").disabled = false;

		document.getElementById("AIMove").innerHTML = "AI(B)Move";
		document.getElementById("AIAutoMove").disabled = true;
		//AutoAI = true;
	}
	else {
		document.getElementById("AIMove").disabled = true;
		document.getElementById("AIMove").innerHTML = "AI-Move";
		document.getElementById("AIAutoMove").disabled = false;
		//AutoAI = false;
	}
}
function showAIBlueBtn(id) {
	if (id.checked) {
		document.getElementById("RedAIMove").style.display = 'block';
		//AutoAI = true;
	}
	else {
		document.getElementById("RedAIMove").style.display = 'none';
		//AutoAI = false;
	}
}


function cellVisibility(id) {


	var id;
	if (id.checked) {
		for (var i = 1; i <= 8; i++) {
			for (var j = 1; j <= 8; j++) {

				id = i * 10 + j;
				document.getElementById("cell" + id).style.visibility = "visible";


			}
		}
	}
	else {
		for (var i = 1; i <= 8; i++) {
			for (var j = 1; j <= 8; j++) {

				id = i * 10 + j;
				document.getElementById("cell" + id).style.visibility = "hidden";


			}
		}
	}

};

function difficultyLevel(id) {
	//MAX_DEPTH=1;
	console.log(board.MAX_DEPTH)

	var d = document.getElementById(id);
	id1 = d.options[d.selectedIndex].id;
	console.log(id1)
	if (id1 == "Medium") {
		board.MAX_DEPTH = 4;
		console.log(board.MAX_DEPTH);
	}
	else if (id1 == "Hard") {
		board.MAX_DEPTH = 6;
		console.log(board.MAX_DEPTH);
	}
	else {
		board.MAX_DEPTH = 1;
		console.log(board.MAX_DEPTH);
	}
	console.log(board.MAX_DEPTH);
}

function setHeuristic(id) {
	//MAX_DEPTH=1;
	console.log("Hii Heuristic value updated");
	console.log(board.heuristic)
	var d = document.getElementById(id);
	id1 = d.options[d.selectedIndex].id;
	var a = document.getElementById("heuristic_id");
	console.log(a)
	if (id1 == "H1") {
		board.heuristic = 1;
		a.innerHTML = "<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 2 * (my_king_pieces - opp_king_pieces)";
		console.log(board.heuristic);
	}
	else if (id1 == "H2") {
		board.heuristic = 2;
		a.innerHTML = "<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 1.75* (my_king_pieces - opp_king_pieces)";
		console.log(board.heuristic);
	}
	else if (id1 == "H3") {
		board.heuristic = 3;
		a.innerHTML = "<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 1.5 * (my_king_pieces - opp_king_pieces)";
		console.log(board.heuristic);
	}
	else if (id1 == "H4") {
		board.heuristic = 4;
		a.innerHTML = "<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 1.25 * (my_king_pieces - opp_king_pieces)";
		console.log(board.heuristic);
	}
	else if (id1 == "H5") {
		board.heuristic = 5;
		a.innerHTML = "<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 1 * (my_king_pieces - opp_king_pieces)";
		console.log(board.heuristic);
	}
	else if (id1 == "H6") {
		board.heuristic = 6;
		a.innerHTML = "<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 2.25 * (my_king_pieces - opp_king_pieces)";
		console.log(board.heuristic);
	}
	else {
		board.heuristic = 7;
		a.innerHTML = "<h3>Selected Heuristic Function is </h3>(my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 2.5 * (my_king_pieces - opp_king_pieces)";
		console.log(board.heuristic);
	}

}

function showPoints() {
	//Score will come in values variable
	var values = board.show_gains_util();
	console.log(values);
	//Implement this
	var tables = document.getElementById('show_table');
	tables.innerHTML = "<tr><td class='show_points'>From Cell</td><td class='show_points'>Gain</td></tr>";

	for (var i = 0; i < values.length; i++) {
		var from_id = values[i].from_row.toString() + values[i].from_col.toString()
		//var to_id=values[i].from_row.toString()+values[i].to_col.toString()
		var gain = values[i].gain.toString()
		tables.innerHTML += "<tr><td class='show_points'>" + from_id + "</td><td class='show_points'>" + gain + "</td></tr>"
	}


}
/* ========================== Some vars============*/
var duplicateBoard = new Board(true, false);

var userHints = [];
var copyUserHints = [];
var hintMoveIndex = 0;

/*================================ show Hint modal ===================== */

function showHint() {
	//make a copy of original board and make changes in cloned board
	var modal = document.getElementById("myModal");
	userHints = board.show_user_hint();
	copyUserHints = userHints.slice();
	$("#modalBody").empty();
	var modalBoard = $("#checkers").clone();
	$("#modalBody").append(modalBoard);
	$("#modalBoard").addClass("tableClass");

	modal.style.display = "block";
	$("#reviewHints").prop("disabled", true);
	$("#prevHint").prop("disabled", true);
	//duplicateBoard = board.copyOf(duplicateBoard);
	duplicateBoard.reset_board(board.board);
}

function nextHintMove() {
	if (hintMoveIndex < userHints.length) {
		var hints = userHints[hintMoveIndex];
		//userHints.shift();
		hintMoveIndex++;
		var fromId = hints.from_row * 10 + hints.from_col;
		var toId = hints.to_row * 10 + hints.to_col;
		var captures = hints.captures;
		//make copy of board object



		if (board.is_red_piece(hints.from_row, hints.from_col)) {
			if (board.is_king_piece(hints.from_row, hints.from_col))
				board.board[hints.to_row][hints.to_col] = 2;
			else
				board.board[hints.to_row][hints.to_col] = 1;
		}
		else if (board.is_black_piece(hints.from_row, hints.from_col)) {
			if (board.is_king_piece(hints.from_row, hints.from_col))
				board.board[hints.to_row][hints.to_col] = -2;
			else
				board.board[hints.to_row][hints.to_col] = -1;
		}

		board.board[hints.from_row][hints.from_col] = 0;
		var i;

		for (i = 0; i < captures.length; i++) {
			board.board[captures[i][0]][captures[i][1]] = 0;
		}

		render_board(board);
		$("#modalBody").empty();
		var modalBoard = $("#checkers").clone();
		$("#modalBody").append(modalBoard);
		$("#modalBoard").addClass("tableClass");

		$("#prevHint").prop("disabled", false);
		// reset original board of sec2 div

	}
	if (userHints.length == hintMoveIndex) {
		//disable nextMove button
		$("#reviewHints").prop("disabled", false);
		$("#nextHint").prop("disabled", true);

		//reInitialize userHints
		board.reset_board(duplicateBoard.board);
		render_board(board);
		//userHints = copyUserHints.slice();
		hintMoveIndex = 0;
	}

}

function reviewHints() {

	$("#nextHint").prop("disabled", false);
	$("#reviewHints").prop("disabled", true);


	$("#modalBody").empty();
	var modalBoard = $("#checkers").clone();
	$("#modalBody").append(modalBoard);
	$("#modalBoard").addClass("tableClass");

}
function closeModal() {

	userHints = [];
	hintMoveIndex = 0;
	copyUserHints = [];
	$("#nextHint").prop("disabled", false);
	$("#reviewHints").prop("disabled", true);
	board = duplicateBoard.copyOf(board);
	render_board(board);
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}
/*================ undo button ========================= */
function undoMove() {

	if (board.prev_boards.length > 0) {
		var lastState = board.prev_boards.pop();
		board.reset_board(lastState);
		render_board(board);
	}
	else {
		console.log("that't it!!!");
	}
}
/*================ win Message Modal ==================== */
function closeWinMessage() {
	/*
	var newBoard = new Board(true, false);
	newBoard.copyOf(board);
	render_board(board);
	var modal = document.getElementById("winMessageModal");
	modal.style.display = "none";
	*/
	window.location.reload();
}
/*============================== Analyse modal =================== */
var mistakeList = [];
var mistakeListId = -1;
var best_id = 0;
var analyseHint = 0;
var analyseHintList = [];
var firstBestClick =true;
function analyseGame() {

	mistakeList = board.get_mistakes();
	console.log(mistakeList.length);
	console.log(mistakeList);
	if (mistakeList.length == 0) {
		console.log("nothing to review. You played well!");
		//var modal1 = document.getElementById("analyseModal");
		//modal1.style.display = "none";
		$("#win").text("Nothing to review. You played well!");
		var modal = document.getElementById("winMessageModal");
		$("#analyse").hide();
		modal.style.display = "block";
	}
	else {
		var modal = document.getElementById("winMessageModal");
		modal.style.display = "none";
		var modal1 = document.getElementById("analyseModal");
		modal1.style.display = "block";
		// disable buttons
		//$("#prev_mistake").prop("disabled", true);
		$("#review_mistake").prop("disabled", true);
		$("#best_move").prop("disabled", true);

		$("#analyseBody").empty();
		var modalBoard = $("#checkers").clone();
		$("#analyseBody").append(modalBoard);
	}
}



function closeAnalyseModal() {
	/*
	var modal1 = document.getElementById("analyseModal");
	modal1.style.display = "none";
	var newBoard = new Board(true, false);
	board= newBoard.copyOf(board);
	render_board(board);
	*/
	window.location.reload();
}
/*
function prevMistake(){
	mistakeListId--;
	if(mistakeListId>=0 && mistakeListId < mistakeList.length)
	{
		if(mistakeListId>0)
		{
			var move = mistakeList[mistakeListId-1];
			var from_id = move.from_row * 10 + move.from_col;
			var to_id = move.to_row * 10 + move.to_col;

			resetCell(from_id, to_id,best_id);

		}
		var currMistake = mistakeList[mistakeListId];
		var move = currMistake.move;
		// show move
		var from_id = move.from_row * 10 + move.from_col;
		var to_id = move.to_row * 10 + move.to_col;
		board.reset_board(currMistake.board);
		render_board(board);

		var to_gain = currMistake.gain_lost;
		var Hints = board.show_user_hint();
		console.log("hints list");
		var best_gain = Hints[0].gain;
		best_id = Hints[0].to_row*10 + Hints[0].to_col;
		
		displayCell(from_id, to_id, best_id, to_gain, best_gain);

		$("#analyseBody").empty();
		var modalBoard = $("#checkers").clone();
		$("#analyseBody").append(modalBoard);
	}
	else
	{
		mistakeListId=-1;
		var currMistake = mistakeList[0];
		var move = currMistake.move;
		// show move
		var from_id = move.from_row * 10 + move.from_col;
		var to_id = move.to_row * 10 + move.to_col;
		board.reset_board(currMistake.board);
		render_board(board);
		//console.log(from_id);
		//console.log(to_id);
		resetCell(from_id, to_id, best_id);
		$("#analyseBody").empty();
		var modalBoard = $("#checkers").clone();
		$("#analyseBody").append(modalBoard);
	}
}
*/
function nextMistake() {
	mistakeListId++;
	if (mistakeListId < mistakeList.length) {
		$("#best_move").prop("disabled", false);
		if (mistakeListId > 0) {
			//reset board
			var move = mistakeList[mistakeListId - 1].move;
			var from_id = move.from_row * 10 + move.from_col;
			var to_id = move.to_row * 10 + move.to_col;

			resetCell(from_id, to_id, best_id);

		}
		firstBestClick =true;
		var currMistake = mistakeList[mistakeListId];
		var move = currMistake.move;
		// show move
		var from_id = move.from_row * 10 + move.from_col;
		var to_id = move.to_row * 10 + move.to_col;
		board.reset_board(currMistake.board);
		render_board(board);

		var to_gain = currMistake.gain_lost;
		var Hints = board.show_user_hint();
		analyseHintList = board.show_user_hint();
		analyseHint = 0;
		var best_gain = Hints[0].gain;
		best_id = Hints[0].to_row * 10 + Hints[0].to_col;

		displayCell(from_id, to_id, best_id, to_gain, best_gain);

		$("#analyseBody").empty();
		var modalBoard = $("#checkers").clone();
		$("#analyseBody").append(modalBoard);
		$("#mistake_id").text("Analyzing mistake " + (mistakeListId + 1));
	}
	if (mistakeListId == mistakeList.length - 1) {
		mistakeListId = -1;
		$("#next_mistake").prop("disabled", true);
		$("#review_mistake").prop("disabled", false);

	}
}
//var analyseHint=0;
//var analyseHintList=[];
function bestMove() {
	if (firstBestClick) {
		var currMistake ;
		if (mistakeListId > 0) {
			//reset board
			var move = mistakeList[mistakeListId].move;
			var from_id = move.from_row * 10 + move.from_col;
			var to_id = move.to_row * 10 + move.to_col;

			resetCell(from_id, to_id, best_id);

		}
		if(mistakeListId==-1)
		{
			var move = mistakeList[mistakeList.length-1].move;
			var from_id = move.from_row * 10 + move.from_col;
			var to_id = move.to_row * 10 + move.to_col;
			resetCell(from_id, to_id, best_id);
			currMistake = mistakeList[mistakeList.length-1];
		}
		else
		{ currMistake = mistakeList[mistakeListId];}
		 
		//var from_id = move.from_row * 10 + move.from_col;
		//var to_id = move.to_row * 10 + move.to_col;

		//resetCell(from_id, to_id, best_id);
		firstBestClick =false;
		
		board.reset_board(currMistake.board);
		render_board(board);
		currMistake =null;
	}
	if (analyseHint < analyseHintList.length) {
		
		var hints = analyseHintList[analyseHint];
		//userHints.shift();
		analyseHint++;
		var fromId = hints.from_row * 10 + hints.from_col;
		var toId = hints.to_row * 10 + hints.to_col;
		var captures = hints.captures;
		//make copy of board object

		if (board.is_red_piece(hints.from_row, hints.from_col)) {
			if (board.is_king_piece(hints.from_row, hints.from_col) || (toId<=88 && toId >=81))
				board.board[hints.to_row][hints.to_col] = 2;
			else
				board.board[hints.to_row][hints.to_col] = 1;
		}
		else if (board.is_black_piece(hints.from_row, hints.from_col)) {
			if (board.is_king_piece(hints.from_row, hints.from_col) || (toId<=18 && toId >=11))
				board.board[hints.to_row][hints.to_col] = -2;
			else
				board.board[hints.to_row][hints.to_col] = -1;
		}

		board.board[hints.from_row][hints.from_col] = 0;
		var i;

		for (i = 0; i < captures.length; i++) {
			board.board[captures[i][0]][captures[i][1]] = 0;
		}
		board.print_board();
		render_board(board);
		$("#analyseBody").empty();
		var modalBoard = $("#checkers").clone();
		$("#analyseBody").append(modalBoard);

	}
	if (analyseHintList.length == analyseHint) {
		//disable nextMove button
		//$("#reviewHints").prop("disabled", false);
		$("#best_move").prop("disabled", true);
		var currMistake = mistakeList[mistakeListId];
		board.reset_board(currMistake.board);
		render_board(board);
		//reInitialize userHints
		//board.reset_board(duplicateBoard.board);
		//render_board(board);
		//userHints = copyUserHints.slice();
		analyseHint = 0;
		firstBestClick =true;
	}
}
function reviewMistakes() {
	$("#mistake_id").text("Analyze Your Mistakes");
	var currMistake = mistakeList[0];
	var move = currMistake.move;
	// show move
	var from_id = move.from_row * 10 + move.from_col;
	var to_id = move.to_row * 10 + move.to_col;
	board.reset_board(currMistake.board);
	render_board(board);
	resetCell(from_id, to_id, best_id);

	$("#analyseBody").empty();
	var modalBoard = $("#checkers").clone();
	$("#analyseBody").append(modalBoard);
	$("#next_mistake").prop("disabled", false);
	$("#review_mistake").prop("disabled", true);

}
function resetCell(from_id, to_id, best_id) {
	$("#" + from_id).css("background", "black");
	$("#" + to_id).css("background", "black");
	$("#" + best_id).css("background", "black");
	$("#" + to_id).text(" ");
	$("#" + best_id).text(" ");
	console.log("from_id: " + from_id);
	console.log("to_id: " + to_id);
	console.log("best_id: " + best_id);
}

function displayCell(from_id, to_id, best_id, to_gain, best_gain) {
	console.log("from_id: " + from_id);
	console.log("to_id: " + to_id);
	console.log("best_id: " + best_id);
	$("#" + from_id).css("background", "#7dfae5");
	$("#" + to_id).css("background", "#807e0b");
	$("#" + best_id).css("background", "#f5f233");
	$("#" + to_id).text("gain:\n" + to_gain);
	$("#" + best_id).text("gain:\n" + best_gain);
}


