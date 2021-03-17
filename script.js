		//import Board  from "board.js";
		
		var prevClicked;
		var currentPossibleMoves=[];
		var prevPossibleMoves=[];
		var thisClick=0;
		var board =  new Board(true);
		board.print_board();
		var redsTurn = true;
		$(document).ready(function(){
		  $("td").click(clickable);
			//$.getScript("board.js");
		});
		function clickable(){
			if(redsTurn) {
				if(thisClick == 0)
				{
					thisClick = this;
					//alert(thisClick.id+" is clicked");
					var cellClass = $('#'+thisClick.id).attr('class');
					
					
					if(!cellClass)
					{
						var pieceClass = $("#"+thisClick.id).children("p").attr('class');
									
						var box=parseInt(thisClick.id,10);
						if(pieceClass == "redPiece")
						{ $("#"+thisClick.id).toggleClass("clicked"); }
						
						/*var box=parseInt(thisClick.id,10);
						possibleMove(box) */
						var rowId = Math.floor(this.id / 10);
						var colId = this.id%10;
						currentPossibleMoves = decodeMoves(board.get_moves_of_piece(rowId, colId));
						displayPossibleMove(currentPossibleMoves, prevPossibleMoves);
					}
					//console.log(cellClass);
				}  
				else {
					prevClick = thisClick;
					thisClick = this;
					
							

					var prevClass = $("#"+prevClick.id).attr('class');
					console.log("===",prevClass);
					if(!prevClass || prevClass == "clicked")
					{
						//console.log($("#"+prevClick.id).children("p").attr('class'));
						var pieceClass = $("#"+prevClick.id).children("p").attr('class');
						if(pieceClass == "redPiece")
						{ $("#"+prevClick.id).toggleClass("clicked"); }
						
						
						
					} 
					
					var cellClass = $('#'+thisClick.id).attr('class');
					

					if(currentPossibleMoves.includes(parseInt(thisClick.id,10)))
					{
							hideMoves(currentPossibleMoves);
							console.log("hide moves");
							makeMove(this.id, prevClick.id);
							console.log("Moved to new cell");
							currentPossibleMoves =[];
							prevPossibleMoves=[];
							thisClick = 0;
							prevClick = 0;
							redsTurn = false;
							//board.get_captures();
							
					}
					if(!cellClass)
					{
						var pieceClass = $("#"+thisClick.id).children("p").attr('class');
						if(pieceClass == "redPiece")
						{ $("#"+thisClick.id).toggleClass("clicked"); }

						prevPossibleMoves = currentPossibleMoves.slice();
						var rowId = Math.floor(this.id / 10);
						var colId = this.id%10;
						currentPossibleMoves = decodeMoves(board.get_moves_of_piece(rowId, colId));
						displayPossibleMove(currentPossibleMoves, prevPossibleMoves);
						
					}
					console.log($('#'+thisClick.id).attr('class'));
					//alert("Click has changed"+thisClick.id+" is clicked."); 
				}
		    }
			else{
				console.log("Black's turn");
				redsTurn = true;
			}
		  };

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
		function makeMove(selectedCell, prevCell)
		{
			$("#"+selectedCell).children("p").removeClass("noPiece");
			$("#"+selectedCell).children("p").addClass("redPiece");
			$("#"+prevCell).children("p").removeClass("redPiece");
			$("#"+prevCell).children("p").addClass("noPiece");

			var from_id = parseInt(prevClick.id,10);
			var to_id = parseInt(thisClick.id, 10);
			var row1 = Math.floor(from_id/10); var col1 = from_id%10;
			var row2 = Math.floor(to_id/10); var col2 = to_id %10;
			
			moves = [{'from_row':row1,'from_col':col1,"to_row":row2, "to_col":col2}];
			captureList = board.make_move(row1, col1, row2, col2 );
			captures = decodeCaptures(captureList);
			displayCaptures(captures);
		};
		function decodeMoves(allPossibleMoves)
		{
			//var allPossibleMoves = [{'row':1 , 'col':2},{'row':3,'col':4}];
			var moves =[];
			if(allPossibleMoves.length)
			{
				var i; var temp;
				for(i=0;i<allPossibleMoves.length;i++)
				{ temp = (allPossibleMoves[i].to_row)*10 + allPossibleMoves[i].to_col; 
				moves.push(temp);
				console.log(moves[i]);
				}
			}
			return moves;
		};
		function displayCaptures(captures)
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
		}
		
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
		

		

		
