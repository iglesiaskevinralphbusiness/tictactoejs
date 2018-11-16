var turn = 'x',
	playerx = "",
	playero = "",
	winner = "";

function new_game(){
	var gameUL = document.getElementById("game");
	var starter = document.getElementById("starter");
	gameUL.innerHTML = "";
	var tr = "",
		data_id = "";
	
	//hide start menu
	starter.style.display = "none";
	
	//set up table
	for (i = 0; i < 3; i++) {
		tr = tr + "<tr>";
		for (j = 0; j < 3; j++) {
			data_id++;
			tr = tr + "<td><button onClick='btn_selet(this)'></button></td>";
		}
		tr = tr + "</tr>";
	}
	gameUL.innerHTML = tr;
	
	//set up turn
	turn = 'x';
	
	//set up player
	winner = "";
	playerx = document.getElementsByName("playerx")[0].value;
	playero = document.getElementsByName("playero")[0].value;
	display_turn();
}

function display_turn(){
	//display who's turn or winner
	var player_name = document.getElementsByName("player" + turn)[0].value;
	document.getElementById("turn").innerHTML = player_name + "'s Turn";
}

function change_turn(){
	//change players turn
	if(turn == "x"){
		turn = "o";
	}
	else {
		turn = "x";
	}
	display_turn();
}

function btn_selet(btn){
	btn.parentElement.innerHTML = turn;
	check_winner();
}

function check_winner(){
	//check for 3-in-a-row horizontally
	get_combination(0,0,0,1,0,2);
	get_combination(1,0,1,1,1,2);
	get_combination(2,0,2,1,2,2);
	
	//check for 3-in-a-row vertically
	get_combination(0,0,1,0,2,0);
	get_combination(0,1,1,1,2,1);
	get_combination(0,2,1,2,2,2);
	
	//check for 3-in-a-row diagonally
	get_combination(0,0,1,1,2,2);
	get_combination(0,2,1,1,2,0);
	
	get_draw();
	
	if(winner == ""){
		change_turn();
	}
}

function get_combination(row1,col1,row2,col2,row3,col3){
	var gameUL = document.getElementById("game");
	
	var row_a = gameUL.rows[row1].cells[col1];
	var row_b = gameUL.rows[row2].cells[col2];
	var row_c = gameUL.rows[row3].cells[col3];
	
	var row_a_cont = row_a.innerHTML;
	var row_b_cont = row_b.innerHTML;
	var row_c_cont = row_c.innerHTML;
	
	if(row_a_cont.length == 1 && row_b_cont.length == 1 && row_c_cont.length == 1){
		if(row_a_cont === row_b_cont && row_a_cont === row_c_cont){
			winner = turn;
			display_winner(row_a, row_b, row_c);
		}
	}
}

function get_draw(){
	var gameUL = document.getElementById("game");
	var buttons = gameUL.getElementsByTagName("button").length;
	if(buttons <= 0 && winner == ""){
		winner = "draw";
		display_winner(0, 0, 0);
	}
}

function display_winner(row_a, row_b, row_c){
	if(winner != "" && winner != "draw"){
		var player_name = document.getElementsByName("player" + winner)[0].value;
		document.getElementById("turn").innerHTML = player_name + " Win!"
			+ '<div class="btn"><button name="newgame" onClick="new_game();" value="Start">Play Again</button></div>';
		
		//add class for the combination
		row_a.classList.add("line");
		row_b.classList.add("line");
		row_c.classList.add("line");
		
		//disabled all button/turn
		var gameUL = document.getElementById("game");
		var buttons = gameUL.getElementsByTagName("button");
		for (var i = 0; i < buttons.length; i++){
			buttons[i].disabled = true;
		};
	}
	else if(winner == "draw"){
		document.getElementById("turn").innerHTML = "Game is draw!"
			+ '<div class="btn"><button name="newgame" onClick="new_game();" value="Start">Play Again</button></div>';
	}
}