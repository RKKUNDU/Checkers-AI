class Board {
    constructor(is_red_top, is_ai_red) {
        /*
            Argument:
                is_red_top (boolean) : whether red pieces will be present in the top of the board
                is_ai_red (boolean) : whether AI player has red pieces
        */

        /*
            we will use 1-based indexing for knowing the cell state of the 8X8 board like board[1][1]
            Following numbers are used to define state of a particular cell of the board
             0 empty cell  
            -1 black piece
             1 red piece
            -2 black king piece
             2 red king piece
             3 restricted cell
        */
        this.board = new Array(9); 
        this.is_red_top = is_red_top;
        this.is_ai_red = is_ai_red;

        for (var i = 0; i < 9; i++) 
            this.board[i] = new Array(9);

        for (var i = 0; i < 9; i++) 
            for (var j = 0; j < 9; j++) 
                this.board[i][j] = 0;

        this.init_game_board();
    }

    init_game_board() {
        
        var reverse = 1;
        if (!this.is_red_top) 
            reverse = -1;

        for (var i = 1; i <= 4; i++) {
            // put red pieces
            this.board[1][2*i] = 1 * reverse;
            this.board[2][2*i-1] = 1 * reverse;
            this.board[3][2*i] = 1 * reverse;

            // put black pieces
            this.board[6][2*i-1] = -1 * reverse;
            this.board[7][2*i] = -1 * reverse;
            this.board[8][2*i-1] = -1 * reverse;
        }

        // Restricted Cells
        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 8; j++) {
                if ((i + j) % 2 == 0)
                    this.board[i][j] = 3;
            }
        }
    }

    print_board() {
        for (var i = 1; i <= 8; i++) {
            var x = "";
            for (var j = 1; j <= 8; j++) {
                var cell;
                if (this.board[i][j] == 1)
                    cell = "r";
                else if (this.board[i][j] == 2)
                    cell = "R";
                else if (this.board[i][j] == -1)
                    cell = "b";
                else if (this.board[i][j] == -2)
                    cell = "B";
                else if (this.board[i][j] == 0)
                    cell = "_";
                else 
                    cell = "x";

                x = x + " " + cell;
            }
            console.log(x);
        }
    }

    game_finished() {
        return false;
    }

    evaluate_board() {
        if (this.is_ai_red) 
            return this.heuristic(this.count_red_pieces(), this.count_red_king_pieces(), this.count_black_pieces(), this.count_black_king_pieces());
        else
            return this.heuristic(this.count_black_pieces(), this.count_black_king_pieces(), this.count_red_pieces(), this.count_red_king_pieces());          
    }

    heuristic(my_pieces, my_king_pieces, opp_pieces, opp_king_pieces) {
        return (my_pieces - my_king_pieces) - (opp_pieces - opp_king_pieces) + 2 * (my_king_pieces - opp_king_pieces);
    }

    count_black_pieces() {
        var cnt = 0;
        for (var i = 1; i <= 8; i++)
            for (var j = 1; j <= 8; j++)
                if (this.is_black_piece(i, j))
                    cnt++;

        return cnt;
    }

    count_black_king_pieces() {
        var cnt = 0;
        for (var i = 1; i <= 8; i++)
            for (var j = 1; j <= 8; j++)
                if (this.is_king_piece(i, j) && this.is_black_piece(i, j))
                    cnt++;

        return cnt;
    }

    count_red_pieces() {
        var cnt = 0;
        for (var i = 1; i <= 8; i++)
            for (var j = 1; j <= 8; j++)
                if (this.is_red_piece(i, j))
                    cnt++;

        return cnt;
    }

    count_red_king_pieces() {
        var cnt = 0;
        for (var i = 1; i <= 8; i++)
            for (var j = 1; j <= 8; j++)
                if (this.is_king_piece(i, j) && this.is_red_piece(i, j))
                    cnt++;

        return cnt;
    }

    is_king_piece(row, col) {
        if (row < 1 || col < 1 || row > 8 || col > 8)
            return false;

        return this.board[row][col] == 2 || this.board[row][col] == -2;
    }

    is_piece(row, col) {
        if (row < 1 || col < 1 || row > 8 || col > 8)
            return false;

        return this.board[row][col] == 1 || this.board[row][col] == -1 || this.is_king_piece(row, col);
    }

    is_red_piece(row, col) {
        if (row < 1 || col < 1 || row > 8 || col > 8)
            return false;

        return this.is_piece(row, col) && this.board[row][col] > 0;
    }

    is_black_piece(row, col) {
        if (row < 1 || col < 1 || row > 8 || col > 8)
            return false;

        return this.is_piece(row, col) && this.board[row][col] < 0;
    }

    is_empty_cell(row, col) {
        if (row < 1 || col < 1 || row > 8 || col > 8)
            return false;

        return this.board[row][col] == 0;
    }

    has_no_move() {
        var all_moves = this.get_all_moves();
        return all_moves.length == 0;
    }

    opponent_has_no_move() {
        var all_moves = this.get_all_opponent_moves();
        return all_moves.length == 0;
    }

    get_all_moves() {
        var all_moves = new Array();
        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 8; j++) {
                if ((this.is_ai_red && this.is_red_piece(i, j)) || (!this.is_ai_red && this.is_black_piece(i, j))) {
                    var moves = this.get_moves_of_piece(i, j);
                    if (moves.length != 0) {
                        var dict = {'from_row': i, 'from_col' : j, 'moves': moves};
                        all_moves.push(dict);
                    }
                }    
            }
        }

        return all_moves;
    }

    get_all_opponent_moves() {
        // invert the colour of the AI player. Hence, opposite player's color will be AI player's colour 
        this.is_ai_red = !this.is_ai_red;
        var all_moves = this.get_all_moves();
        //revert the change
        this.is_ai_red = !this.is_ai_red;
        return all_moves;
    }

    get_moves_of_piece(row, col,rec_call=0) {
        /*
            Arguments:
                row (int) : row no of the piece
                col (int) : col no of the piece
                rec_call  : 0 if it's not a recursive call
                            1 if it's a recursive call from a red piece
                            2 if it's a recursive call from a black piece
            Returns:
                Array of dictionaries
                each dictionary is of the following format : {'to_row': , 'to_col': , 'captures': [[row, col], ...]]
        */
        if(row <= 0 || row > 8 || col <= 0 || col > 8)
            return -1;

        if (rec_call == 0 && !this.is_piece(row, col)) 
            return new Array();

        var i=row;
        var j=col;
        var moves_lst=[];
        if (!this.is_king_piece(row, col)) {
            if (this.is_red_piece(row, col) || rec_call == 1) {
                // move downward direction
                if (this.is_red_top) {
                    // Left
                    if(rec_call==0){
                        if(this.is_empty_cell(i+1,j-1)){
                            moves_lst.push({'to_row':i+1,'to_col':j-1, 'captures': []});
                        }
                        else if(this.is_red_piece(i+1, j-1)){
                            // do_nothing
                        }
                    }
                    if(this.is_black_piece(i+1, j-1) && this.is_empty_cell(i+2, j-2)){
                        // black piece at (i+1, j-1) will be captured. So, add in the `captures` list

                        var tmp=this.get_moves_of_piece(i+2,j-2,1)
                        if(tmp.length == 0) {
                            moves_lst.push({'to_row':i+2,'to_col':j-2, 'captures': [[i+1, j-1]]});
                        } else{
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i+1, j-1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                    }

                    // Right
                    if(rec_call==0){
                        if(this.is_empty_cell(i+1, j+1)){
                            moves_lst.push({'to_row':i+1,'to_col':j+1, 'captures': []});
                        }
                        else if(this.is_red_piece(i+1, j+1)){
                            // do_nothing
                        }
                    }

                    if(this.is_black_piece(i+1, j+1) && this.is_empty_cell(i+2, j+2)){
                        // black piece at (i+1, j+1) will be captured. So, add in the `captures` list
                        var tmp=this.get_moves_of_piece(i+2,j+2,1)
                        
                        if(tmp.length == 0) {
                            moves_lst.push({'to_row':i+2,'to_col':j+2, 'captures': [[i+1, j+1]]});
                        } else {
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i+1, j+1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                        //moves_lst.push(this.get_moves_of_piece(i+2,j+2,1));
                    }
                } else { // TODO: move upward direction
                    
                }
            } else if (this.is_black_piece(row, col) || rec_call == 2) {
                // move upward direction
                if (this.is_red_top) {
                    
                    // move in Left diagonal 
                    if(rec_call == 0){
                        if(this.is_empty_cell(i-1,j-1)) {
                            moves_lst.push({'to_row':i-1,'to_col':j-1, 'captures': []});
                        } else if(this.is_black_piece(i-1,j-1)) {
                            // do_nothing
                        }
                    }

                    if(this.is_red_piece(i-1,j-1) && this.is_empty_cell(i-2, j-2)){
                        // red piece at (i-1, j-1) will be captured. So, add in the `captures` list
                        var tmp = this.get_moves_of_piece(i-2,j-2,2);
                        
                        if(tmp.length==0){
                            moves_lst.push({'to_row':i-2,'to_col':j-2, 'captures': [[i-1, j-1]]});
                        } else {
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i-1, j-1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                    }

                    // move in Right diagonal
                    if(rec_call == 0){
                        if(this.is_empty_cell(i-1,j+1)){
                            moves_lst.push({'to_row':i-1,'to_col':j+1, 'captures': []});
                        } else if(this.is_black_piece(i-1,j+1)) {
                            // do nothing
                        }
                    }

                    if(this.is_red_piece(i-1,j+1) && this.is_empty_cell(i-2,j+2)){
                        // red piece at (i-1, j+1) will be captured. So, add in the `captures` list

                        tmp = this.get_moves_of_piece(i-2,j+2,2);
                        if(tmp.length==0) {
                            moves_lst.push({'to_row':i-2,'to_col':j+2, 'captures': [[i-1, j+1]]})
                        } else {
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i-1, j+1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                    }
                }
            } 
        } else {
            if (this.is_red_piece(row, col) || rec_call == 3) {
                // move downward direction
                if (this.is_red_top) {
                    // Left
                    if(rec_call==0){
                        if(this.is_empty_cell(i+1,j-1)){
                            moves_lst.push({'to_row':i+1,'to_col':j-1, 'captures': []});
                        }
                        else if(this.is_red_piece(i+1, j-1)){
                            // do_nothing
                        }
                    }
                    if(this.is_black_piece(i+1, j-1) && this.is_empty_cell(i+2, j-2)){
                        // black piece at (i+1, j-1) will be captured. So, add in the `captures` list

                        var tmp=this.get_moves_of_piece(i+2,j-2,3)
                        if(tmp.length == 0) {
                            moves_lst.push({'to_row':i+2,'to_col':j-2, 'captures': [[i+1, j-1]]});
                        } else{
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i+1, j-1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                    }

                    // Right
                    if(rec_call==0){
                        if(this.is_empty_cell(i+1, j+1)){
                            moves_lst.push({'to_row':i+1,'to_col':j+1, 'captures': []});
                        }
                        else if(this.is_red_piece(i+1, j+1)){
                            // do_nothing
                        }
                    }

                    if(this.is_black_piece(i+1, j+1) && this.is_empty_cell(i+2, j+2)){
                        // black piece at (i+1, j+1) will be captured. So, add in the `captures` list
                        var tmp=this.get_moves_of_piece(i+2,j+2,3)
                        
                        if(tmp.length == 0) {
                            moves_lst.push({'to_row':i+2,'to_col':j+2, 'captures': [[i+1, j+1]]});
                        } else {
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i+1, j+1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                        //moves_lst.push(this.get_moves_of_piece(i+2,j+2,1));
                    }
                    // move in Left diagonal 
                    if(rec_call == 0){
                        if(this.is_empty_cell(i-1,j-1)) {
                            moves_lst.push({'to_row':i-1,'to_col':j-1, 'captures': []});
                        } else if(this.is_red_piece(i-1,j-1)) {
                            // do_nothing
                        }
                    }

                    if(this.is_black_piece(i-1,j-1) && this.is_empty_cell(i-2, j-2)){
                        // red piece at (i-1, j-1) will be captured. So, add in the `captures` list
                        var tmp = this.get_moves_of_piece(i-2,j-2,3);
                        
                        if(tmp.length==0){
                            moves_lst.push({'to_row':i-2,'to_col':j-2, 'captures': [[i-1, j-1]]});
                        } else {
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i-1, j-1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                    }

                    // move in Right diagonal
                    if(rec_call == 0){
                        if(this.is_empty_cell(i-1,j+1)){
                            moves_lst.push({'to_row':i-1,'to_col':j+1, 'captures': []});
                        } else if(this.is_red_piece(i-1,j+1)) {
                            // do nothing
                        }
                    }

                    if(this.is_black_piece(i-1,j+1) && this.is_empty_cell(i-2,j+2)){
                        // red piece at (i-1, j+1) will be captured. So, add in the `captures` list

                        tmp = this.get_moves_of_piece(i-2,j+2,3);
                        if(tmp.length==0) {
                            moves_lst.push({'to_row':i-2,'to_col':j+2, 'captures': [[i-1, j+1]]})
                        } else {
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i-1, j+1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                    }
                } else { // TODO: move upward direction
                    
                }
                
            } else if (this.is_black_piece(row, col) || rec_call == 4) {
                // move upward direction
                if (this.is_red_top) {
                    
                    // move in Left diagonal 
                    if(rec_call == 0){
                        if(this.is_empty_cell(i-1,j-1)) {
                            moves_lst.push({'to_row':i-1,'to_col':j-1, 'captures': []});
                        } else if(this.is_black_piece(i-1,j-1)) {
                            // do_nothing
                        }
                    }

                    if(this.is_red_piece(i-1,j-1) && this.is_empty_cell(i-2, j-2)){
                        // red piece at (i-1, j-1) will be captured. So, add in the `captures` list
                        var tmp = this.get_moves_of_piece(i-2,j-2,4);
                        
                        if(tmp.length==0){
                            moves_lst.push({'to_row':i-2,'to_col':j-2, 'captures': [[i-1, j-1]]});
                        } else {
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i-1, j-1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                    }

                    // move in Right diagonal
                    if(rec_call == 0){
                        if(this.is_empty_cell(i-1,j+1)){
                            moves_lst.push({'to_row':i-1,'to_col':j+1, 'captures': []});
                        } else if(this.is_black_piece(i-1,j+1)) {
                            // do nothing
                        }
                    }

                    if(this.is_red_piece(i-1,j+1) && this.is_empty_cell(i-2,j+2)){
                        // red piece at (i-1, j+1) will be captured. So, add in the `captures` list

                        tmp = this.get_moves_of_piece(i-2,j+2,4);
                        if(tmp.length==0) {
                            moves_lst.push({'to_row':i-2,'to_col':j+2, 'captures': [[i-1, j+1]]})
                        } else {
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i-1, j+1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                    }
                    
                                        // Left
                    if(rec_call==0){
                        if(this.is_empty_cell(i+1,j-1)){
                            moves_lst.push({'to_row':i+1,'to_col':j-1, 'captures': []});
                        }
                        else if(this.is_black_piece(i+1, j-1)){
                            // do_nothing
                        }
                    }
                    if(this.is_red_piece(i+1, j-1) && this.is_empty_cell(i+2, j-2)){
                        // black piece at (i+1, j-1) will be captured. So, add in the `captures` list

                        var tmp=this.get_moves_of_piece(i+2,j-2,4)
                        if(tmp.length == 0) {
                            moves_lst.push({'to_row':i+2,'to_col':j-2, 'captures': [[i+1, j-1]]});
                        } else{
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i+1, j-1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                    }

                    // Right
                    if(rec_call==0){
                        if(this.is_empty_cell(i+1, j+1)){
                            moves_lst.push({'to_row':i+1,'to_col':j+1, 'captures': []});
                        }
                        else if(this.is_black_piece(i+1, j+1)){
                            // do_nothing
                        }
                    }

                    if(this.is_red_piece(i+1, j+1) && this.is_empty_cell(i+2, j+2)){
                        // black piece at (i+1, j+1) will be captured. So, add in the `captures` list
                        var tmp=this.get_moves_of_piece(i+2,j+2,4)
                        
                        if(tmp.length == 0) {
                            moves_lst.push({'to_row':i+2,'to_col':j+2, 'captures': [[i+1, j+1]]});
                        } else {
                            for (var x = 0; x < tmp.length; x++) {
                                tmp[x]['captures'].push([i+1, j+1]);
                            }
                            moves_lst = moves_lst.concat(tmp);
                        }
                        //moves_lst.push(this.get_moves_of_piece(i+2,j+2,1));
                    }

                }
            }
            // TODO: check rules for king pieces
        }
        return moves_lst;
    }

    make_move(move) {
        /*
            Argument:
                move : Dictionary with following keys
                        from_row : int
                        from_col : int
                        to_row : int
                        to_col : int
                        captures : Array of Arrays. Each internal array has two elements [row, col] 

        */
        var from_row = move['from_row'];
        var from_col = move['from_col'];
        var to_row = move['to_row'];
        var to_col = move['to_col'];
        var captures = move['captures'];
        
        this.board[to_row][to_col] = this.board[from_row][from_col];
        // Make the cell empty
        this.board[from_row][from_col] = 0;

        for (var i=0; i < captures.length; i++) {
            var row = captures[i][0];
            var col = captures[i][1];

            // if a (not crowned) piece captures opponent's piece of 7th or 2nd row (should be in the opposite side), it becomes a crowned piece
            if (!this.is_king_piece(to_row, to_col) && this.is_red_top && this.is_black_piece(row, col) && row == 7) 
                this.board[to_row][to_col] = 2; // red king piece
            
            if (!this.is_king_piece(to_row, to_col) && this.is_red_top && this.is_red_piece(row, col) && row == 2) 
                this.board[to_row][to_col] = -2; // black king piece
            
            if (!this.is_king_piece(to_row, to_col) && !this.is_red_top && this.is_black_piece(row, col) && row == 2) 
                this.board[to_row][to_col] = 2; // red king piece
            
            if (!this.is_king_piece(to_row, to_col) && !this.is_red_top && this.is_red_piece(row, col) && row == 7) 
                this.board[to_row][to_col] = -2; // black king piece
            
            // capture the piece by making the cell empty
            this.board[row][col] = 0;
        }
    }

    has_won() {
        // There is no opponent piece
        if ((this.is_ai_red && this.count_black_pieces() == 0) || (!this.is_ai_red && this.count_red_pieces() == 0))
            return true;

        // opponent has no move
        if (this.opponent_has_no_move())
            return true;  // TODO: confirm this is according to rule

        // TODO: check if there is more ways to win
    }

    has_lost() {
        // There is no opponent piece
        if ((this.is_ai_red && this.count_red_pieces() == 0) || (!this.is_ai_red && this.count_black_pieces() == 0))
            return true;

        // there is no move for the player
        if (this.has_no_move()) 
            return true; // TODO: confirm this is according to rule

        // TODO: check if there is more ways to lose
    }

    has_drawn() {
        // TODO: check rules
        return false;
    }

    is_game_finished() {
        return this.has_won() || this.has_lost() || this.has_drawn();
    }

    copyOf(obj) {
        /*
            Create copy of this object to `obj`
        */
        for (var i = 1; i <= 8; i++)
            for (var j = 1; j <= 8; j++) 
                obj.board[i][j] = this.board[i][j];
        
        obj.is_ai_red = this.is_ai_red;
        obj.is_red_top = this.is_red_top;

        return obj;
    }

    test() {
        this.board=[[4,4,4,4,4,4,4,4,4],
                    [4,3,1,3,1,3,1,3,1],
                    [4,1,3,1,3,1,3,1,3],
                    [4,3,1,3,1,3,1,3,1],
                    [4,0,3,0,3,0,3,0,3],
                    [4,3,0,3,0,3,0,3,0],
                    [4,-1,3,-1,3,-1,3,-1,3],
                    [4,3,-1,3,-1,3,-1,3,-1],
                    [4,-1,3,-1,3,-1,3,-1,3]];

        this.board=[[4,4,4,4,4,4,4,4,4],
                    [4,3,1,3,1,3,1,3,1],
                    [4,1,3,1,3,1,3,1,3],
                    [4,3,1,3,1,3,1,3,1],
                    [4,0,3,-1,3,0,3,0,3],
                    [4,3,0,3,0,3,0,3,0],
                    [4,-1,3,-1,3,-1,3,1,3],
                    [4,3,-1,3,-1,3,0,3,-1],
                    [4,-1,3,-1,3,0,3,-1,3]];


        this.print_board();
        console.log(this.evaluate_board());
        console.log('--------------------');
        alpha_beta(this, MAX_DEPTH, Number.MIN_VALUE, Number.MAX_VALUE, true);
        this.print_board();
        console.log(this.evaluate_board());
    }
}

var MAX_DEPTH = 3;
var board = new Board(true, true);
board.test();

function alpha_beta(board, depth, alpha, beta, maximizer) {
    if (depth == 0 || board.is_game_finished())
        return board.evaluate_board();

    if (maximizer) {
        var max_val = Number.NEGATIVE_INFINITY;
        var moves = board.get_all_moves();
        var best_move = {};

        for (var i = 0; i < moves.length; i++) {
            for (var j = 0; j < moves[i]['moves'].length; j++) {
                var board_copy = new Board();
                board.copyOf(board_copy);

                var move = {
                    'from_row': moves[i]['from_row'],
                    'from_col': moves[i]['from_col'],
                    'to_row': moves[i]['moves'][j]['to_row'],
                    'to_col': moves[i]['moves'][j]['to_col'],
                    'captures': moves[i]['moves'][j]['captures']
                };
                
                board_copy.make_move(move);
                var val = alpha_beta(board_copy, depth-1, alpha, beta, false);

                if (val > max_val) {
                    max_val = val;
                    best_move.from_row = move['from_row'];
                    best_move.from_col = move['from_col'];
                    best_move.to_row = move['to_row'];
                    best_move.to_col = move['to_col'];
                    best_move.captures = move['captures'];
                }

                if (val > alpha)
                    alpha = val;

                if (alpha >= beta)
                    break;
            }
        }

        if (depth == MAX_DEPTH) 
            board.make_move(best_move);
        
        return max_val;
    } else {
        var min_val = Number.POSITIVE_INFINITY;
        var moves = board.get_all_opponent_moves();

        for (var i = 0; i < moves.length; i++) {
            for (var j = 0; j < moves[i]['moves'].length; j++) {
                var board_copy = new Board();
                board.copyOf(board_copy);

                var move = {
                    'from_row': moves[i]['from_row'],
                    'from_col': moves[i]['from_col'],
                    'to_row': moves[i]['moves'][j]['to_row'],
                    'to_col': moves[i]['moves'][j]['to_col'],
                    'captures': moves[i]['moves'][j]['captures']
                };

                board_copy.make_move(move);
                var val = alpha_beta(board_copy, depth-1, alpha, beta, true);

                if (val < min_val)
                    min_val = val;

                if (val < beta)
                    beta = val;

                if (alpha >= beta)
                    break;
            }
        }
        
        return min_val;
    }
}