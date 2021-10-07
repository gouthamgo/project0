// When the page loads, Player 1 (X) is the first player to go



$(document).ready(function() {
    $('.board td').on('click', makeAMove);//main function
    $('button').on('click', restart) ///to restart the game
  });

  // function makeAMove(e) {//event object
  const makeAMove = function (e) {

    // e.preventDefault();//default action prevented
    var cell = $(e.currentTarget);
    // The currentTarget event property returns the element whose event listeners triggered the event.

  //Check for marked square
    if(cell.text() !== "") {
      showMessage('full');
// If a player clicks a cell that has already been marked,
// they should see an alert letting them know that the cell in question has already been taken

      window.setTimeout(function () {//function to remove the message
        removeMessage('full');
      },1500);
      return false;
    }

  //Place 'x' or 'o' depending on which player is current
    checkPlayer(cell);//checkpalyerfunction call
  }

 // When Player 1 clicks an empty cell, it should be marked with an "X",
//  and Current Player should switch to two

  function checkPlayer(element) {
    var currentPlayer = $('#current span').text();
    // Return text content current player

    if (currentPlayer === '1') {
      element.text('X').addClass('X');
        checkForMatch();
       // window.setTimeout(checkForMatch,1000);//call for chekforMatch function
      $('#current span').text('2');
    } else {
        // When Player 2 clicks an empty cell, it should be marked with an "O",
        //  and Current Player should switch back to one

      element.text('O').addClass('O');
        checkForMatch();
       // window.setTimeout(checkForMatch,1000);
      $('#current span').text('1');
    }

  }
  // show messages
  function showMessage(name) {
      $('#alertContainer').css('display', 'flex');
      //  css("propertyname","value");
      $('#' + name).css('display','block');
    }

    function removeMessage(name) {
      $('#alertContainer').css('display', 'none');
      $('#' + name).css('display','none');

    }





  //function to check the wins
  function checkForMatch() {
    var row1 = $('.row1').text();
    var row2 = $('.row2').text();
    var row3 = $('.row3').text();
    var rD = $('.rD').text();
    var lD = $('.lD').text();
    var col1 = $('.col1').text();
    var col2 = $('.col2').text();
    var col3 = $('.col3').text();

    var POneScore = parseInt($('#POneScore').text());//convert string to number and return
    var PTwoScore = parseInt($('#PTwoScore').text());

    var POneWins = row1 === "XXX" || row2 === "XXX" || row3 === "XXX" ||
                        rD === "XXX" || lD === "XXX" || col1 === "XXX" ||
                        col2 === "XXX" || col3 === "XXX";
    var PTwoWins = row1 === "OOO" || row2 === "OOO" || row3 === "OOO" ||
                         rD === "OOO" || lD === "OOO" || col1 === "OOO" ||
                         col2 === "OOO" || col3 === "OOO";

    if (POneWins) {
      showMessage('win');
      POneScore ++  ;
      $('#POneScore').text(POneScore);
      window.setTimeout(resetBoard,1500);
    } else if (PTwoWins) {
      showMessage('win');
      PTwoScore ++;
      $('#PTwoScore').text(PTwoScore);
      window.setTimeout(resetBoard,1500);
    } else if ((row1 + row2 + row3).length === 9) {
      showMessage('draw');
      window.setTimeout(resetBoard,1500);
    }
  }




  //function to reset the board
  function resetBoard() {
    $('.board').find('td').text('').removeClass('O', 'X');
    removeMessage('win');
    removeMessage('draw');
  }
  //function to restart
  function restart() {
    resetBoard();//reset the board
    $('#POneScore').text('0'); // scores come to 0
    $('#PTwoScore').text('0'); 
    $('#current span').text('1');// player 1 comes to play
}
