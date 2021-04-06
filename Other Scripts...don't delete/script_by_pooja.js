		
var MAX_DEPTH = 1;
var startGame = false;
var quitGame = false;
var currentPossibleMoves=[];
var currentCapturesAndMoves = [];
var prevPossibleMoves=[];


var thisClick=0;
var prevClicked;

var AutoAI = false;
var understanding_mode = false;
var board =  new Board(true,false);
board.print_board();

var ai_class = "blackPiece"; var player_class="redPiece";
var redsTurn = true;
var ai_turn = false;

if(board.is_ai_red)
{
	ai_class = "redPiece";
	player_Class = "blackPiece";
	ai_turn = true;
}

if(board.is_game_finished())
{
	if(board.has_won())
	{

		if(!alert("AI has won!!"))
			window.location.reload();

		else if(board.has_lost())
			{	if(!alert("You won!!"))
		window.location.reload();
	}
}
}

$(document).ready(function(){
	$('input[type="radio"]').click(function(){
		var inputValue = $(this).attr("value");
		console.log(inputValue);
		var targetBox = $("." + inputValue+"_1");
		console.log(targetBox);
		$(".box").not(targetBox).hide();
		$(targetBox).show();
	});
	$("td").click(clickable);

});

/* ===================================== Cell clickable code starts here =========================== */
function clickable(){
	console.log(ai_turn);
	if(startGame && !board.is_game_finished() && !ai_turn) 
	{

				if(thisClick == 0)
				{	
					//user has clicked for the first time
					thisClick = this;
					var cellClass = $('#'+thisClick.id).attr('class');
					
					console.log(cellClass);
					if(!cellClass )
					{
						
						var pieceClass = $("#"+thisClick.id).children("p").attr('class');
						if(pieceClass == "redPiece" || pieceClass == "redKingPiece")
						{ 
							$("#"+thisClick.id).toggleClass("clicked"); 
							var rowId = Math.floor(this.id / 10);
							var colId = this.id%10;
							currentCapturesAndMoves = board.get_moves_of_piece(rowId, colId);
							currentPossibleMoves = decodeMoves(currentCapturesAndMoves);
							displayPossibleMove(currentPossibleMoves, prevPossibleMoves);
						}
						
						console.log(MAX_DEPTH);
						
					}
					
				}  
				else
				{
					//user has previously clicked
					prevClick = thisClick;
					thisClick = this;
					
					var prevClass = $("#"+prevClick.id).attr('class');

					if(!prevClass || prevClass == "clicked")
					{
						//make previous click normal. 
						var prevPieceClass = $("#"+prevClick.id).children("p").attr('class');
						
						if(prevPieceClass == "redPiece" || prevPieceClass == "redKingPiece")
						{ 
							//if previously red piece was clicked the make previous piece normal.
							$("#"+prevClick.id).toggleClass("clicked");
						}

					} 
					
					var cellClass = $('#'+thisClick.id).attr('class');
					var pieceClass = $("#"+thisClick.id).children("p").attr('class');
					
					// if player has chosen a move
					if(currentPossibleMoves.includes( parseInt(thisClick.id,10)) )
					{
						hideMoves(currentPossibleMoves);
						makeMove(this.id, prevClick.id, currentCapturesAndMoves);

							//if game has finished then display this message
							if(board.is_game_finished())
							{
								syncWait(1000);
								if(board.has_won())
								{
									
									if(!alert("AI has won!!"))
										window.location.reload();

									else if(board.has_lost())
									{	
										if(!alert("You won!!"))
											window.location.reload();
									}
								}
							}

							else
							{
								currentPossibleMoves =[];
								currentCapturesAndMoves=[];
								prevPossibleMoves=[];
								thisClick = 0;
								prevClick = 0;
								redsTurn = false;
								$("#RedTurn").css("opacity","0.5");
								$("#BlackTurn").css("opacity","1.0");
								console.log(AutoAI)
								if(!AutoAI)
								{ 
									console.log("helo");
									setTimeout(() => {  handle_ai_turn(); }, 1000);
									ai_turn = true; 
								}
								else
								{

									handle_ai_turn();
								}

								//await new Promise(done => setTimeout(() => done(), 2000));
								//me();
								//delay(2000);
								//handle_ai_turn();
								//ai_turn = true;
							}
							
					}

					// otherwise if player has clicked on another redPiece to check possible moves
					
					else if(!cellClass && pieceClass != "blackPiece" && pieceClass != "blackKingPiece")
					{
						
						if(pieceClass == "redPiece" || pieceClass == "redKingPiece")
						{ 
							$("#"+thisClick.id).toggleClass("clicked"); 
						}

						prevPossibleMoves = currentPossibleMoves.slice();
						var rowId = Math.floor(this.id / 10);
						var colId = this.id%10;
						currentCapturesAndMoves = board.get_moves_of_piece(rowId, colId);
						currentPossibleMoves = decodeMoves(currentCapturesAndMoves);
						displayPossibleMove(currentPossibleMoves, prevPossibleMoves);
						
					}
					// if player has clicked on some other cell, then hide previous possible moves. Reset currentPossibleMoves and prevPossibleMoves
					else if(currentPossibleMoves.length)
					{
						hideMoves(currentPossibleMoves);
						currentPossibleMoves=[];
						prevPossibleMoves=[];
					}
					//console.log("class of current clicked piece is:");
					//console.log($('#'+thisClick.id).attr('class'));
				}

	}
	else if(board.is_game_finished())
	{
		syncWait(1000);
		if(board.has_won())
		{
			if(!alert("AI has won!!"))
				window.location.reload();
		}	
		else if(board.has_lost())
		{	
			if(!alert("You won!!"))
			window.location.reload();
		}
	}
	else if(!startGame)
	{
		alert("Press \"Play\" button to start the game ");
	}
};
	/*====================================cell Clickable function ends here ====================================== */
	//MOVED
	function handle_ai_turn()
	{
		console.log(understanding_mode);
		console.log(AutoAI);
		if(understanding_mode && !AutoAI)
		{
			console.log("press AI-move button to proceed");
			showPoints();
		}
		else
		{
			console.log("AI's turn");
			blacksMove = alpha_beta(board, board.MAX_DEPTH, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY,true, true);
			AImove(blacksMove);
			ai_turn = false;

			if(board.is_game_finished()){

				if(board.has_won())
				{
					syncWait(1000);
					if(!alert("AI has won!!"))
						window.location.reload();
				}	
				else if(board.has_lost())
				{	
					syncWait(1000);
					if(!alert("You won!!"))
						window.location.reload();
				}
			}
			$("#RedTurn").css("opacity","1.0");
			$("#BlackTurn").css("opacity","0.5");

		}
		ai_turn = false;
	}

	//MOVED
	function MakeAIMove()
	{
		console.log("AI's turn");
		blacksMove = alpha_beta(board, board.MAX_DEPTH, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY,true, true);
		AImove(blacksMove);
		ai_turn = false;

		if(board.is_game_finished()){

			if(board.has_won())
			{
				syncWait(1000);
				if(!alert("AI has won!!"))
					window.location.reload();
			}	
			else if(board.has_lost())
			{	
				syncWait(1000);
				if(!alert("You won!!"))
					window.location.reload();
			}
		}
		$("#RedTurn").css("opacity","1.0");
		$("#BlackTurn").css("opacity","0.5");
		ai_turn = false;
		showPoints()
	}

	//MOVED
	function AImove(move)
	{

		var from_id = (parseInt(move.from_row,10) * 10) + (parseInt(move.from_col,10));
		var to_id = (parseInt(move.to_row,10)*10 ) + (parseInt(move.to_col,10));

		var AIcaptures = decodeCaptures(move.captures);

			// finding out intermediate cells (when multiple captures)
			var intermediateCells =[];
			
			if(AIcaptures.length)
			{
				intermediateCells = decodeCaptures(get_path(move.from_row, move.from_col,move.captures,move.captures.length-1));
				showIntermediate(intermediateCells);
			}

			if(board.is_king_piece(move.to_row,move.to_col))
			{

				$("#"+from_id).children("p").removeClass("blackKingPiece");
				$("#"+from_id).children("p").addClass("noPiece");
				$("#"+to_id).children("p").removeClass("noPiece");
				$("#"+to_id).children("p").addClass("blackKingPiece");
			}
			else
			{
				console.log("black to no piece");
				$("#"+from_id).children("p").removeClass("blackPiece");
				$("#"+from_id).children("p").addClass("noPiece");
				$("#"+to_id).children("p").removeClass("noPiece");
				$("#"+to_id).children("p").addClass("blackPiece");
			}

			//check if this piece has become a king piece
			if(board.is_king_piece(move.to_row,move.to_col) && board.is_black_piece(move.to_row,move.to_col))
			{
				$("#"+to_id).children("p").removeClass("blackPiece");
				$("#"+to_id).children("p").addClass("blackKingPiece");
			}

			
			
			if(AIcaptures.length)
			{
				//setTimeout(() => {displayRedCaptures(AIcaptures, intermediateCells); }, 500);
				displayRedCaptures(AIcaptures, intermediateCells);
				//hideIntermediate(intermediateCells);
			}

			
			
		};


		function makeMove(selectedCell, prevCell,catures)
		{
			var row_id = Math.floor(selectedCell/10); 
			var col_id = selectedCell%10;

			

			var from_id = parseInt(prevClick.id,10);
			var to_id = parseInt(thisClick.id, 10);
			var row1 = Math.floor(from_id/10); var col1 = from_id%10;
			var row2 = Math.floor(to_id/10); var col2 = to_id %10;

			// retrieve captures from currentCapturesAndMoves
			var captures=[]
			for (var i = 0; i < currentCapturesAndMoves.length; i++)
			{
				if (currentCapturesAndMoves[i]['to_row'] == row2 && currentCapturesAndMoves[i]['to_col'] == col2) 
				{
					captures = currentCapturesAndMoves[i].captures;
				}
			}
			var move = {'from_row':row1,'from_col':col1, "to_row":row2, "to_col":col2,'captures':captures};
			board.make_move(move);

			//check if this piece has become a king piece
			if(board.is_king_piece(row2,col2) && board.is_red_piece(row2,col2))
			{
				
				$("#"+to_id).children("p").removeClass("redPiece");
				$("#"+to_id).children("p").addClass("redKingPiece");
			}

			Redcaptures = decodeCaptures(captures);
			//console.log("captures have been decoded");
			var intermediateCells=[];
			
			if(Redcaptures.length)
			{	
				intermediateCells = decodeCaptures(get_path(row1,row2,captures,captures.length-1));
				showIntermediate(intermediateCells);
				
			}
			
			if(board.is_king_piece(row_id,col_id))
			{
				$("#"+selectedCell).children("p").removeClass("noPiece");
				$("#"+selectedCell).children("p").addClass("redKingPiece");
				$("#"+prevCell).children("p").removeClass("redKingPiece");
				$("#"+prevCell).children("p").addClass("noPiece");
			}
			else{
				console.log("maving piece, making red to nopiece");
				$("#"+selectedCell).children("p").removeClass("noPiece");
				$("#"+selectedCell).children("p").addClass("redPiece");
				$("#"+prevCell).children("p").removeClass("redPiece");
				$("#"+prevCell).children("p").addClass("noPiece");
			}
			board.print_board();
			if(Redcaptures.length)
			{
				//setTimeout(() => {displayBlackCaptures(Redcaptures, intermediateCells); }, 500);
				displayBlackCaptures(Redcaptures, intermediateCells);
				//hideIntermediate(intermediateCells);
			}

			//hideIntermediate(intermediateCells);
			if(board.is_game_finished()){
				if(board.has_won())
				{
					if(!alert("AI has won!!"))
						window.location.reload();
				}	
				else if(board.has_lost())
					{	if(!alert("You won!!"))
				window.location.reload();
			}
		}
		ai_turn = true;
	};


	//MOVED
	function displayPossibleMove(possibleMoves,prevPossible)
	{
		if(prevPossible.length)
		{
			var id2; 
			for(i=0;i<prevPossible.length;i++)
			{ 
				id2  = prevPossible[i];
				$("#"+id2).children("p").removeClass("possibleMove");
				$("#"+id2).children("p").addClass("noPiece");
			}
		}
		if(possibleMoves.length)
		{
			var id; 
			for(i=0;i<possibleMoves.length;i++)
			{ 
				id  = possibleMoves[i];
					//$("#"+id2).children("p").removeClass("noPiece");
					$("#"+id).children("p").addClass("possibleMove");
					
				}
			}

		};


		//MOVED
		function hideMoves(possibleMoves)
		{
			if(possibleMoves.length)
			{
				var id; 
				for(i=0;i<possibleMoves.length;i++)
				{ 
					id  = possibleMoves[i];
					console.log("chaning possible move to nopiece");
					$("#"+id).children("p").removeClass("possibleMove");
					$("#"+id).children("p").addClass("noPiece");
				}
			}
		};
		
		//MOVED
		function decodeMoves(allPossibleMoves)
		{
			//format of  allPossibleMoves : [ [{'to_row':1 , 'to_col':2},{'to_row':3,'to_col':4},{'captures':[]}] ];
			var moves =[]; var allMoves=[]
			if(allPossibleMoves.length)
			{
				var i; var temp;
				for(i=0;i<allPossibleMoves.length;i++)
				{ 
					temp = (allPossibleMoves[i].to_row)*10 + allPossibleMoves[i].to_col; 
					moves.push(temp);

				}
				allMoves.push(moves);
			}
			//console.log(allMoves);
			return moves;
		};

		//MOVED
		function showIntermediate(intermediate)
		{
			if(intermediate.length)
			{
				var ID;
				for(i=0;i<intermediate.length;i++)
				{
					ID = intermediate[i];
					$("#"+ID).fadeOut();
					$("#"+ID).fadeIn();
					//$("#"+ID).children("p").addClass("noPiece");
					console.log("shsbab");
					//$("#"+ID).toggleClass("noPiece");
				}

			}

		};

		//MOVED
		function hideIntermediate(intermediate)
		{
			syncWait(200);
			if(intermediate.length)
			{
				var ID;
				for(i=0;i<intermediate.length;i++)
				{
					ID = intermediate[i];
					$("#"+ID).toggleClass("showPath");
					//$("#"+ID).children("p").addClass("noPiece");
				}
			}
		};

		//MOVED
		function displayRedCaptures(captures,intermediate)
		{
			
			if(captures.length)
			{
				var id; 
				for(i=0;i<captures.length;i++)
				{ 
					id  = captures[i];
					if($("#"+id).children("p").attr("class") == "redKingPiece")
					{
						$("#"+id).children("p").removeClass("redKingPiece");
						$("#"+id).children("p").addClass("noPiece");
					}
					else
					{
						$("#"+id).children("p").removeClass("redPiece");
						$("#"+id).children("p").addClass("noPiece");
					}
				}
			}
			
		};

		function displayBlackCaptures(captures,intermediate)
		{
			if(captures.length)
			{
				var id; 
				for(i=0;i<captures.length;i++)
				{ 
					id  = captures[i];
					if($("#"+id).children("p").attr("class") == "blackKingPiece")
					{
						$("#"+id).children("p").removeClass("blackKingPiece");
						$("#"+id).children("p").addClass("noPiece");
					}
					else
					{
						$("#"+id).children("p").removeClass("blackPiece");
						$("#"+id).children("p").addClass("noPiece");
					}
				}
				
			}
		};
		

		//move->hideCapturedPiece(possibleCaptures)
		function decodeCaptures(possibleCaptures)
		{
			var captures =[];
			if(possibleCaptures.length)
			{
				var i; var temp;
				for(i=0;i<possibleCaptures.length;i++)
					{ temp = (possibleCaptures[i][0])*10 + possibleCaptures[i][1]; 
						captures.push(temp);
						console.log(captures[i]);
					}
				}
				return captures;
			};

			//moved
			function disableAImoveBtn(id){
				if(id.checked){
					document.getElementById("AIMove").disabled = true;
					AutoAI = true;
				}
				else{
					document.getElementById("AIMove").disabled = false;	
					AutoAI = false;
				}
			}

			//moved
			function GameStarted()
			{
				startGame = true;

				$("#Play_U").attr("disabled",true);
				$("#Play").attr("disabled",true);
			//$("#RedTurn").show();
			$("#BlackTurn").css("opacity","0.5");
		};

		//moved
		function GameStopped()
		{
			quitGame = true;

			window.location.reload();
		};

		//moved
		const syncWait = ms => {
			const end = Date.now() + ms
			while (Date.now() < end) continue
		}


