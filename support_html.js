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

function disableModes(id1,id2){
	document.getElementById(id1).disabled = true;
	document.getElementById(id2).disabled = true;
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
