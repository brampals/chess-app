var game = new Chess();
var board;

var PIECE_SYMBOLS = {
  white_captures: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛' },
  black_captures: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕' }
};

function updateHistory() {
  var moves = game.history({ verbose: true });

  var html = '';
  for (var i = 0; i < moves.length; i += 2) {
    var moveNum = (i / 2) + 1;
    var white = moves[i].san;
    var black = moves[i + 1] ? moves[i + 1].san : '';
    html += '<div class="move-row">'
          + '<span class="move-num">' + moveNum + '.</span>'
          + '<span class="move-san">' + white + '</span>'
          + (black ? '<span class="move-san">' + black + '</span>' : '')
          + '</div>';
  }
  var historyEl = document.getElementById('move-history');
  historyEl.innerHTML = html;
  historyEl.scrollTop = historyEl.scrollHeight;

  var whiteCaptured = '';
  var blackCaptured = '';
  for (var j = 0; j < moves.length; j++) {
    if (moves[j].captured) {
      if (moves[j].color === 'w') {
        whiteCaptured += PIECE_SYMBOLS.white_captures[moves[j].captured] || '';
      } else {
        blackCaptured += PIECE_SYMBOLS.black_captures[moves[j].captured] || '';
      }
    }
  }
  document.getElementById('white-captures').textContent = whiteCaptured;
  document.getElementById('black-captures').textContent = blackCaptured;
}

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
  updateHistory();
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
  updateHistory();
});

updateStatus();
