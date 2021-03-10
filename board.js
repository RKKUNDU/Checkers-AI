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

    get_all_moves() {
        var all_moves = new Array();
        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 8; j++) {
                if ((this.is_ai_red && this.is_red_piece(i, j)) || (!this.is_ai_red && this.is_black_piece(i, j))) {
                    moves = this.get_moves_of_piece(i, j);
                    all_moves.concat(moves);
                }    
            }
        }

        return all_moves;
    }

    get_moves_of_piece(row, col) {
        /*
            Arguments:
                row (int) : row no of the piece
                col (int) : col no of the piece

            Returns:
                Array of arrays
                each array of the following format : [from_row, from_col, to_row, to_col]
        */
        if (!this.is_piece(row, col))
            return new Array();
 
        if (!this.is_king_piece(row, col)) {
            if (this.is_red_piece(row, col)) {
                if (this.is_red_top) {
                    // move downward direction 
                    var moves = new Array();

                    // move left diagonal
                    if (col != 1 && this.is_empty_cell(row+1, col-1)) 
                        moves.push([row, col, row+1, col-1]);
                    
                    // move right diagonal
                    if (col != 8 && this.is_empty_cell(row+1, col+1))
                        moves.push([row, col, row+1, col+1]);
                    
                    // TODO: capture opponent pieces and jump
                    return moves;
                } else {
                    // move upward direction
                    
                }
            }
        } else {
            // TODO: check rules
        }
    }

    make_move(from_row, from_col, to_row, to_col) {
        // TODO: whole function
        // make the move
        // capture the move
    }

}

var board = new Board(true);
board.print_board();
board.get_moves_of_piece(4,1);
