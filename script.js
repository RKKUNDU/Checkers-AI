
		var prevClicked;
		var possible1, possible2;
		var thisClick=0;
		  $(document).ready(function(){
				  $("td").click(function(){
					if(thisClick == 0)
					{
						thisClick = this;
						//alert(thisClick.id+" is clicked");
						var cellClass = $('#'+thisClick.id).attr('class');
						
						
						if(!cellClass)
						{
							var pieceClass = $("#"+thisClick.id).children("p").attr('class');
										
							var box=parseInt(thisClick.id,10);
							if(pieceClass == "blackPiece")
							{ $("#"+thisClick.id).toggleClass("clicked"); }
							
							var box=parseInt(thisClick.id,10);
							var cellClass1 = $('#'+(box-9)).children("p").attr('class');
							var cellClass2 = $('#'+(box-11)).children("p").attr('class');
							if(cellClass1 == undefined)
							
							{$("#"+(box-9)).toggleClass("possibleMove");}	
							
							if(cellClass2 == undefined)
							
							{$("#"+(box-11)).toggleClass("possibleMove");}	
							
							 


						}
						//console.log(cellClass);
					}  
					else {
						prevClick = thisClick;
						thisClick = this;
								

						var prevClass = $("#"+prevClick.id).attr('class');
						console.log(prevClass);
						if(!prevClass || prevClass == "clicked")
						{
							//console.log($("#"+prevClick.id).children("p").attr('class'));
							var pieceClass = $("#"+prevClick.id).children("p").attr('class');
							if(pieceClass == "blackPiece")
							{ $("#"+prevClick.id).toggleClass("clicked"); }
							
							var box=parseInt(prevClick.id,10);
							var cellClass1 = $('#'+(box-9)).children("p").attr('class');
							var cellClass2 = $('#'+(box-11)).children("p").attr('class');
							if(cellClass1 == undefined)
						
							{$("#"+(box-9)).toggleClass("possibleMove");}	
						
							if(cellClass2 == undefined)
						
							{$("#"+(box-11)).toggleClass("possibleMove");}	
						
						} 
						
						var cellClass = $('#'+thisClick.id).attr('class');
						if(!cellClass)
						{
							var pieceClass = $("#"+thisClick.id).children("p").attr('class');
							if(pieceClass == "blackPiece")
							{ $("#"+thisClick.id).toggleClass("clicked"); }
							
							var box=parseInt(thisClick.id,10);
							var cellClass1 = $('#'+(box-9)).children("p").attr('class');
							var cellClass2 = $('#'+(box-11)).children("p").attr('class');
							if(cellClass1 == undefined)
						
							{$("#"+(box-9)).toggleClass("possibleMove");}	
						
							if(cellClass2 == undefined)
						
							{$("#"+(box-11)).toggleClass("possibleMove");}	
						
						}
						console.log($('#'+thisClick.id).attr('class'));
						//alert("Click has changed"+thisClick.id+" is clicked."); 
					}
				  });
			});

		
		
