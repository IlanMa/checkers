$(document).ready(function(){
var checkersGame = new Object();

// *******************************
// FIX BUG WITH TWO FORCED PIECES
// *******************************

checkersGame.generateTable = function(){
    var board = '<table><tr>'
    var count = 0;
    for (i=0; i<64; i++){               
        if (this.board[i] === 'B')
            board += '<td class="black" id='+i+' onclick="move('+i+')"><img src="images/BlueCircle.png"></td>'            
        else if (this.board[i] === 'R')
            board += '<td class="black" id='+i+' onclick="move('+i+')"><img src="images/RedCircle.png"></td>'
        else if (this.board[i] === 'X' && count%2 == 0){
            if(i%2==0)
                board += '<td class="gray" id='+i+'></td>'
            else
                 board += '<td class="black"  id='+i+' onclick="move('+i+')"><img src="images/EmptySquare.png"></td>'
        }else{
            if(i%2!=0)
                board += '<td class="gray" id='+i+'></td>'
            else
                board += '<td class="black" id='+i+' onclick="move('+i+')"><img src="images/EmptySquare.png"></td>'
        }       
        if((i+1)%8==0){
            board += '</tr><tr>'
            count ++
        } 
    }
    board += '</table>';
    $('#gameboard').html(board)
}

move = function(id){
    if(checkersGame.gameActive){
        if (checkersGame.Turn && checkersGame.board[id] === "R")
            checkersGame.changeImage(id, 'Red')
        else if (!checkersGame.Turn && checkersGame.board[id] === "B")
            checkersGame.changeImage(id, 'Blue')
        else if (checkersGame.Turn && checkersGame.board[id] === "RK")
            checkersGame.changeImage(id, 'RedKing')
        else if (!checkersGame.Turn && checkersGame.board[id] === "BK")
            checkersGame.changeImage(id, 'BlueKing')
        else if(checkersGame.force == ''){
            if (checkersGame.Turn && checkersGame.lastPiece == "Red" && checkersGame.board[id] === "X" && checkersGame.selected>-1 && ((id+7 == checkersGame.selected && id%8 != 0) || (id+9 == checkersGame.selected && (id+1)%8 != 0)))
                checkersGame.movePiece(id, 'Red', 'R') 
            else if (!checkersGame.Turn && checkersGame.lastPiece == "Blue" && checkersGame.board[id] === "X" && checkersGame.selected>-1 && ((id-7 == checkersGame.selected  && (id+1)%8 != 0)|| (id-9 == checkersGame.selected && id%8 != 0)))
                checkersGame.movePiece(id, 'Blue', 'B')
            else if (checkersGame.Turn && checkersGame.lastPiece == "RedKing" && checkersGame.board[id] === "X" && checkersGame.selected>-1 && ((id+7 == checkersGame.selected && id%8 != 0) || (id+9 == checkersGame.selected && (id+1)%8 != 0) || (id-7 == checkersGame.selected  && (id+1)%8 != 0)|| (id-9 == checkersGame.selected && id%8 != 0)))
                checkersGame.movePiece(id, 'RedKing', 'RK')
            else if (!checkersGame.Turn && checkersGame.lastPiece == "BlueKing" && checkersGame.board[id] === "X" && checkersGame.selected>-1 && ((id+7 == checkersGame.selected && id%8 != 0) || (id+9 == checkersGame.selected && (id+1)%8 != 0) || (id-7 == checkersGame.selected  && (id+1)%8 != 0)|| (id-9 == checkersGame.selected && id%8 != 0)))
                checkersGame.movePiece(id, 'BlueKing', 'BK')
        }
        else{
            if (checkersGame.Turn && checkersGame.lastPiece == "Red" && checkersGame.board[id] === "X" && checkersGame.selected>-1 && (id+14 == checkersGame.selected && (checkersGame.board[id+7] == 'B' || checkersGame.board[id+7] == 'BK') || id+18 == checkersGame.selected && (checkersGame.board[id+9] == 'B' || checkersGame.board[id+9] == 'BK')))
                checkersGame.movePiece(id, 'Red', 'R', true)
            else if (!checkersGame.Turn && checkersGame.lastPiece == "Blue" && checkersGame.board[id] === "X" && checkersGame.selected>-1 && (id-14 == checkersGame.selected && (checkersGame.board[id-7] == 'R' ||  checkersGame.board[id-7] == 'RK') || id-18 == checkersGame.selected && (checkersGame.board[id-9] == 'R' ||  checkersGame.board[id-9] == 'RK')))
                checkersGame.movePiece(id, 'Blue', 'B', true)
            else if (checkersGame.Turn && checkersGame.lastPiece == "RedKing" && checkersGame.board[id] === "X" && checkersGame.selected>-1 && (id+14 == checkersGame.selected && (checkersGame.board[id+7] == 'B' || checkersGame.board[id+7] == 'BK') || id+18 == checkersGame.selected && (checkersGame.board[id+9] == 'B' || checkersGame.board[id+9] == 'BK')) || (id-14 == checkersGame.selected && (checkersGame.board[id-7] == 'B' || checkersGame.board[id-7] == 'BK') || id-18 == checkersGame.selected && (checkersGame.board[id-9] == 'B' || checkersGame.board[id-9] == 'BK')))
                checkersGame.movePiece(id, 'RedKing', 'RK', true)
            else if (!checkersGame.Turn && checkersGame.lastPiece == "BlueKing" && checkersGame.board[id] === "X" && checkersGame.selected>-1 && (id+14 == checkersGame.selected && (checkersGame.board[id+7] == 'R' ||  checkersGame.board[id+7] == 'RK') || id+18 == checkersGame.selected && (checkersGame.board[id+9] == 'R' ||  checkersGame.board[id+9] == 'RK')) || (id-14 == checkersGame.selected && (checkersGame.board[id-7] == 'R' ||  checkersGame.board[id-7] == 'RK') || id-18 == checkersGame.selected && (checkersGame.board[id-9] == 'R' ||  checkersGame.board[id-9] == 'RK')))
                checkersGame.movePiece(id, 'BlueKing', 'BK', true)
        }
    } 
}
checkersGame.changeImage = function(id, color){
    $('#'+this.selected).children().attr('src', 'images/'+this.lastPiece+'Circle.png' )
    $('#'+id).children().attr('src', 'images/'+color+'CircleHighLight.png' )
    this.selected = id
    this.lastPiece = color
}
checkersGame.movePiece = function(id, color, array, eat){
    var lastForce = this.force
    this.force = '';
    this.board[checkersGame.selected] = 'X'
    this.board[id] = array
    if(eat){
        this.board[(checkersGame.selected+id)/2] = 'X'
        $('#'+(this.selected+id)/2).children().attr('src', 'images/EmptySquare.png')
        if (this.Turn){
            this.bluePieces --
            $('#blue').html('Blue Pieces: '+this.bluePieces)
            if(this.bluePieces<=0)
                this.endGame('Red')
        }else{
            this.redPieces --
            $('#red').html('Red Pieces: '+this.redPieces)
            if(this.redPieces<=0)
                this.endGame('Blue')
        }
        this.checkForce(true, lastForce)
    }else{
        this.checkForce(false)
    }
    if (!this.Turn && id >= 0 && id <=7){
        this.turnKing(id, 'RedKing', 'RK')
    }else if (this.Turn && id >= 56){
        this.turnKing(id, 'BlueKing', 'BK')
    }else{
        $('#'+id).children().attr('src', 'images/'+color+'Circle.png')
    }
    $('#'+this.selected).children().attr('src', 'images/EmptySquare.png')
    this.selected = -1
}                           
checkersGame.checkForce = function(continueStreak, lastForce){
    if (continueStreak)
        this.Turn = !this.Turn
  
    for(j=0;j<65;j++){
        if (this.Turn && (this.board[j] == "R" || this.board[j] == "RK") && ((this.board[j-7] == "B" && this.board[j+7] == "X"  && j%8 !=0) || (this.board[j-9] == "B" && this.board[j+9] == 'X'  && (j+1)%8 !=0)))
            this.force = 'blue'
        else if (!this.Turn && (this.board[j] == "B" || this.board[j] == "BK") && ((this.board[j+7] == "R" && this.board[j-7] == "X"  && (j+1)%8 !=0) || (this.board[j+9] == "R" && this.board[j-9] == 'X' && j%8 != 0)))
            this.force = 'red'
        else if (this.Turn && (this.board[j] == "R" || this.board[j] == "RK") && ((this.board[j-7] == "BK" && this.board[j+7] == "X"  && j%8 !=0) || (this.board[j-9] == "BK" && this.board[j+9] == 'X'  && (j+1)%8 !=0) || (this.board[j+7] == "BK" && this.board[j-7] == "X"  && (j+1)%8 !=0) || (this.board[j+9] == "BK" && this.board[j-9] == 'X' && j%8 != 0)))
            this.force = 'blue'
        else if (!this.Turn && (this.board[j] == "B" || this.board[j] == "BK") && ((this.board[j-7] == "RK" && this.board[j+7] == "X"  && j%8 !=0) || (this.board[j-9] == "RK" && this.board[j+9] == 'X'  && (j+1)%8 !=0) || (this.board[j+7] == "RK" && this.board[j-7] == "X"  && (j+1)%8 !=0) || (this.board[j+9] == "RK" && this.board[j-9] == 'X' && j%8 != 0)))
            this.force = 'red'
    }
    if (this.force != '')
        $('#force').html('Forced to Jump')
    else
         $('#force').html('')
    if(this.Turn)
        $('#turn').html("Blue's Turn")
    else
        $('#turn').html("Red's Turn")
        
    this.Turn = !this.Turn
    if(continueStreak && this.force != lastForce)
        this.checkForce(false)             
} 
checkersGame.turnKing = function(id, color, piece){
    $('#'+id).children().attr('src', 'images/'+color+'Circle.png')
    this.board[id] = piece    
}
checkersGame.endGame = function(color){
    $('#winner').html(color +" Wins!");
    $('#button').css("display", "block");
    this.gameActive = false;
}

restart = function(){
    $('#winner').html('');
    $('#turn').html("Red's Turn");
    $('#blue').html('Blue Pieces: 12');
    $('#red').html('Red Pieces: 12');
    $('#button').css("display", "none");
    checkersGame.gameActive = true; //checks if you can play
    checkersGame.Turn = true;
    checkersGame.lastPiece = ''
    checkersGame.force = ''
    checkersGame.currentId = '';
    checkersGame.selected = -1;
    checkersGame.bluePieces = 12;
    checkersGame.redPieces = 12;
    checkersGame.board = 
    [
    'X','B','X','B','X','B','X','B',
    'B','X','B','X','B','X','B','X',
    'X','B','X','B','X','B','X','B',
    'X','X','X','X','X','X','X','X',
    'X','X','X','X','X','X','X','X',
    'R','X','R','X','R','X','R','X',
    'X','R','X','R','X','R','X','R',
    'R','X','R','X','R','X','R','X'
    ]
    checkersGame.generateTable()    
}
})