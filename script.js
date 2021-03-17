		
		var MAX_DEPTH = 1;
		
		var currentPossibleMoves=[];
		var currentCapturesAndMoves = [];
		var prevPossibleMoves=[];

		var thisClick=0;
		var prevClicked;

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
		/*
		while(!board.is_game_finished())
		{
			if (ai_turn)
			{
				console.log("Black's turn");
				ai_moves = alpha_beta(board, MAX_DEPTH, Number.MIN_VALUE, Number.MAX_VALUE,true);
				AImove(ai_moves);
				ai_turn = !ai_turn;
			} 
			else 
			{ 
				ai_turn = !ai_turn;
			
			}
	
		}
		*/
		$(document).ready(function(){
		  $("td").click(clickable);
			
		});
		function clickable(){
			if(!board.is_game_finished()) {
				if(thisClick == 0)
				{	
					//user has clicked for the first time
					thisClick = this;
					var cellClass = $('#'+thisClick.id).attr('class');
					
					
					if(!cellClass)
					{
						var pieceClass = $("#"+thisClick.id).children("p").attr('class');
						if(pieceClass == player_class)
						{ 
							$("#"+thisClick.id).toggleClass("clicked"); 
						}
						
						
						var rowId = Math.floor(this.id / 10);
						var colId = this.id%10;
						currentCapturesAndMoves = board.get_moves_of_piece(rowId, colId);
						currentPossibleMoves = decodeMoves(currentCapturesAndMoves);
						displayPossibleMove(currentPossibleMoves, prevPossibleMoves);
					}
					
				}  
				else {
					//user has previously clicked
					prevClick = thisClick;
					thisClick = this;
					
					var prevClass = $("#"+prevClick.id).attr('class');

					console.log("===",prevClass,"======");

					if(!prevClass || prevClass == "clicked")
					{
						//make previous click normal. 
						var prevPieceClass = $("#"+prevClick.id).children("p").attr('class');
						if(prevPieceClass == "redPiece")
						{ 
							//if previously red piece was clicked the make previous piece normal.
							$("#"+prevClick.id).toggleClass("clicked");
						}
							
					} 
					
					var cellClass = $('#'+thisClick.id).attr('class');
					
					// if player has chosen a move
					if(currentPossibleMoves.includes( parseInt(thisClick.id,10)) )
					{
							hideMoves(currentPossibleMoves);
							console.log("hide moves");
							makeMove(this.id, prevClick.id, currentCapturesAndMoves);
							console.log("Moved to new cell");
							currentPossibleMoves =[];
							currentCapturesAndMoves=[];
							prevPossibleMoves=[];
							thisClick = 0;
							prevClick = 0;
							redsTurn = false;
							setTimeout(() => {  handle_ai_turn(); }, 2000);
							//handle_ai_turn();
					}
					// otherwise if player has clicked on another redPiece to check possible moves
					else if(!cellClass)
					{
						var pieceClass = $("#"+thisClick.id).children("p").attr('class');
						if(pieceClass == "redPiece")
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
					console.log("class of current clicked piece is:");
					console.log($('#'+thisClick.id).attr('class'));
				}
		    }
			/*
			else{
				console.log("Black's turn");
				blacksMove = alpha_beta(board, MAX_DEPTH, Number.MIN_VALUE, Number.MAX_VALUE,true);
				AImove(blacksMove);
				ai_turn = !ai_turn;
			}*/
		  };

		  function handle_ai_turn()
		  {
			console.log("Black's turn");
			blacksMove = alpha_beta(board, MAX_DEPTH, Number.MIN_VALUE, Number.MAX_VALUE,true);
			AImove(blacksMove);
			ai_turn = !ai_turn;
		  }

		  function displayPossibleMove(possibleMoves,prevPossible){
			
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
					$("#"+id).children("p").addClass("possibleMove");
					
				}
			}

		};
		function hideMoves(possibleMoves)
		{
			if(possibleMoves.length)
			{
				var id; 
				for(i=0;i<possibleMoves.length;i++)
				{ 
					id  = possibleMoves[i];
					$("#"+id).children("p").removeClass("possibleMove");
					$("#"+id).children("p").addClass("noPiece");
				}
			}
		};

		function makeMove(selectedCell, prevCell,captures)
		{
			$("#"+selectedCell).children("p").removeClass("noPiece");
			$("#"+selectedCell).children("p").addClass("redPiece");
			$("#"+prevCell).children("p").removeClass("redPiece");
			$("#"+prevCell).children("p").addClass("noPiece");

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

			Redcaptures = decodeCaptures(captures);
			console.log(Redcaptures);
			if(Redcaptures.length)
			{
				setTimeout(() => {displayBlackCaptures(Redcaptures); }, 500);
				//displayBlackCaptures(Redcaptures);
			}

		};
		function AImove(move)
		{
			console.log(move);
			var from_id = (parseInt(move.from_row,10) * 10) + (parseInt(move.from_col,10));
			var to_id = (parseInt(move.to_row,10)*10 ) + (parseInt(move.to_col,10));
			
			$("#"+from_id).children("p").removeClass("blackPiece");
			$("#"+from_id).children("p").addClass("noPiece");
			$("#"+to_id).children("p").removeClass("noPiece");
			$("#"+to_id).children("p").addClass("blackPiece");

			AIcaptures = decodeCaptures(move.captures);
			if(AIcaptures.length)
			{
				setTimeout(() => {displayRedCaptures(AIcaptures); }, 500);
			}

		};
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
			console.log(allMoves);
			return moves;
		};

		function displayRedCaptures(captures)
		{
			if(captures.length)
			{
				var id; 
				for(i=0;i<captures.length;i++)
				{ 
					id  = captures[i];
					
					$("#"+id).children("p").removeClass("redPiece");
					$("#"+id).children("p").addClass("noPiece");
				}
			}
		};

		function displayBlackCaptures(captures)
		{
			if(captures.length)
			{
				var id; 
				for(i=0;i<captures.length;i++)
				{ 
					id  = captures[i];
					$("#"+id).children("p").removeClass("blackPiece");
					$("#"+id).children("p").addClass("noPiece");
				}
			}
		};
		
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
		
		
		
