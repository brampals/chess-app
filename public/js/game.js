var game = new Chess();
var board;

function onDragStart(source, piece) {
  if (game.game_over()) return false;
  if (game.turn() === 'w' && piece.search(/^b/) !== -1) return false;
  if (game.turn() === 'b' && piece.search(/^w/) !== -1) return false;
}

function onDrop(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  updateStatus();
}

function onSnapEnd() {
  board.position(game.fen());
}

function updateStatus() {
  var status;
  var moveColor = game.turn() === 'w' ? 'White' : 'Black';

  if (game.in_checkmate()) {
    var winner = moveColor === 'White' ? 'Black' : 'White';
    status = winner + ' wins by checkmate!';
  } else if (game.in_stalemate()) {
    status = 'Draw by stalemate';
  } else if (game.in_draw()) {
    status = 'Draw';
  } else {
    status = moveColor + ' to move';
    if (game.in_check()) {
      status += ' (in check)';
    }
  }

  document.getElementById('status').textContent = status;
}

board = Chessboard('board', {
  draggable: true,
  position: 'start',
  pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
});

document.getElementById('newGameBtn').addEventListener('click', function () {
  game.reset();
  board.position('start');
  updateStatus();
});

updateStatus();
