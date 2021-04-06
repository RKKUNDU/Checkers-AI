	function handle_ai_turn()
	{
		console.log("understanding_mode");
		console.log("AutoAI");
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
			//this display Message might be important
			//displayMessage();
			
			$("#RedTurn").css("opacity","1.0");
			$("#BlackTurn").css("opacity","0.5");

		}
		ai_turn = false;
	}
	function MakeAIMove()
	{
		console.log("AI's turn");
		blacksMove = alpha_beta(board, board.MAX_DEPTH, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY,true, true);
		AImove(blacksMove);
		ai_turn = false;
		//displayMessage();
		
		$("#RedTurn").css("opacity","1.0");
		$("#BlackTurn").css("opacity","0.5");
		ai_turn = false;
		showPoints()
	}


	function AImove(move)
	{

		var from_id = (parseInt(move.from_row,10) * 10) + (parseInt(move.from_col,10));
		var to_id = (parseInt(move.to_row,10)*10 ) + (parseInt(move.to_col,10));
		if(prevPossibleMove != currentCapturesAndMoves)
		{
			hidePrevPossibleMove(prevPossibleMove);
			render_board(board);
		}
		
		var AIcaptures = decodeCaptures(move.captures);
		//finding out intermediate cells (when multiple captures)
		
		var intermediateCells =[];
			
		if(AIcaptures.length)
		{
			intermediateCells = decodeCaptures(get_path(move.from_row, move.from_col,move.captures,move.captures.length-1));
			showIntermediate(intermediateCells);
		}
		

		//WHY THIS CONDITION BEEN CHECKED??
		//Shouldn't it be from_row and from_col
		if(board.is_king_piece(move.to_row,move.to_col))
		{
			console.log("blackKingPiece to noPiece")
			board.board[(move.from_row)][(move.from_col)]=0;
			console.log("noPiece to blackKingPiece")	
			board.board[(move.to_row)][(move.to_col)]=-2;
			render_board(board);
		}
		else
		{
			console.log("black to no piece");
			board.board[(move.from_row)][(move.from_col)]=0;
			console.log("no piece to black");	
			board.board[(move.to_row)][(move.to_col)]=-1;
			render_board(board);
			
		}

		//check if this piece has become a king piece
		if(board.is_king_piece(move.to_row,move.to_col) && board.is_black_piece(move.to_row,move.to_col))
		{
			
			board.board[(move.to_row)][(move.to_col)]=-2;
			render_board(board);
			//$("#"+to_id).children("p").removeClass("blackPiece");
			//$("#"+to_id).children("p").addClass("blackKingPiece");
		}

			
			
		if(AIcaptures.length)
		{
			setTimeout(() => {displayRedCaptures(AIcaptures, intermediateCells); }, 500);
			displayRedCaptures(AIcaptures, intermediateCells);
			hideIntermediate(intermediateCells);
		}
		

			
			
	};
	function decodeCaptures(possibleCaptures)
	{
		var captures =[];
		//displayMessage();
		if(possibleCaptures.length)
		{
			var i; var temp;
			for(i=0;i<possibleCaptures.length;i++)
			{ 
				temp = (possibleCaptures[i][0])*10 + possibleCaptures[i][1]; 
				captures.push(temp);
				console.log(captures[i]);
			}
		}
		else
		{
			ai_turn = false;
			//setTimeout(() => {  displayMessage(); }, 1000);
		}
		return captures;

	};


	
	function displayRedCaptures(captures,intermediate)
	{

		if(captures.length)
		{
			var id;var curr_i;var curr_j;
			for(i=0;i<captures.length;i++)
			{ 
				id  = captures[i];
				curr_i = Math.floor(id / 10);
				curr_j = id%10;
				board.board[curr_i][curr_j]=0;		

			}
		}

	};
	
	function showIntermediate(intermediate)
	{
		if(intermediate.length)
		{
			var ID;
			for(i=0;i<intermediate.length;i++)
			{
				ID = intermediate[i];
				$("#"+ID).fadeOut(1500);
				$("#"+ID).fadeIn();
					//$("#"+ID).children("p").addClass("noPiece");
					console.log("shsbab");
					//$("#"+ID).toggleClass("noPiece");
			}

		}

	};

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
	


	