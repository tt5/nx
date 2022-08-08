// src/index.ts
import { Hono } from 'hono';
import { html, raw } from 'hono/html';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());

app.get('/home', (c) => {
  //c.header('Cache-Control', 'private, max-age=60')
  return c.html(
    html`<div id="content-home" x-show="$store.contentCurrent == 'home'">content-home<div>`
  );
});

app.get('/chess', (c) => {
  const drawBoardState = `
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
          if (legalState[i][j]=='x') {
            ctx.fillStyle = 'orange';
          } else {
            if (((i + j*8 - j) % 2) == 1) {
              ctx.fillStyle = darkSquare;
            } else {
              ctx.fillStyle = lightSquare;
            };
          };
					ctx.fillRect(i*squareDim, j*squareDim, squareDim, squareDim );

          if (((i + j*8 - j) % 2) == 1) {
            ctx.fillStyle = darkSquare;
          } else {
            ctx.fillStyle = lightSquare;
          };
					ctx.fillRect(i*squareDim+5, j*squareDim+5, squareDim-10, squareDim-10 );

					if (boardState[i][j][0] == 'b') {
						ctx.fillStyle = darkPiece;
					} else {
						ctx.fillStyle = lightPiece;
					};
					chessPieceA = '';
					switch (boardState[i][j][1]) {
						case 'p': chessPieceA = '\u265f'; break;
						case 'r': chessPieceA = '\u265c'; break;
						case 'k': chessPieceA = '\u265e'; break;
						case 'b': chessPieceA = '\u265d'; break;
						case 'q': chessPieceA = '\u265b'; break;
						case 'K': chessPieceA = '\u265a'; break;
						default: break;
					};
					ctx.fillText(chessPieceA, i*squareDim + squareDim/2, j*squareDim + squareDim - pieceVerticalOffset);
					ctx.strokeText(chessPieceA, i*squareDim + squareDim/2, j*squareDim + squareDim - pieceVerticalOffset);
				};
			};
      `

  const borderYellow = `
    pieces.fillStyle = 'yellow';
    pieces.fillRect(ctxX*squareDim, ctxY*squareDim, squareDim, squareDim);
    if (((ctxX + ctxY*8 - ctxY) % 2) == 1) {
      pieces.fillStyle = darkSquare;
    } else {
      pieces.fillStyle = lightSquare;
    };
		pieces.fillRect(ctxX*squareDim+5, ctxY*squareDim+5, squareDim-10, squareDim-10);
      `

  const drawPiece = `
					if (boardState[ctxX][ctxY][0] == 'b') {
						pieces.fillStyle = darkPiece;
					} else {
						pieces.fillStyle = lightPiece;
					};
					chessPieceB = '';
					switch (boardState[ctxX][ctxY][1]) {
						case 'p': chessPieceB = '\u265f'; break;
						case 'r': chessPieceB = '\u265c'; break;
						case 'k': chessPieceB = '\u265e'; break;
						case 'b': chessPieceB = '\u265d'; break;
						case 'q': chessPieceB = '\u265b'; break;
						case 'K': chessPieceB = '\u265a'; break;
						default: break;
					};
					pieces.fillText(chessPieceB, ctxX*squareDim + squareDim/2, ctxY*squareDim + squareDim - pieceVerticalOffset);
					pieces.strokeText(chessPieceB, ctxX*squareDim + squareDim/2, ctxY*squareDim + squareDim - pieceVerticalOffset);
          `

  return c.html(
    html`
<template x-teleport="#content">
<div id="content-chess" x-show="$store.contentCurrent == 'chess'">

<canvas
	style="
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	"
	id='boardCanvas'
	width=400
	height=400
	x-data="{
		board: {}, 
		ctx: {}, 
		squareDim: 50,
		pieceVerticalOffset: 7,
		darkSquare: 'rgb(150, 150, 150)',
		lightSquare: 'rgb(240, 240, 240)',
		darkPiece: 'black',
		lightPiece: 'white',
		boardState: [
			['br', 'bp', '', '', '', '', 'wp', 'wr'],
			['bk', 'bp', '', '', '', '', 'wp', 'wk'],
			['bb', 'bp', '', '', '', '', 'wp', 'wb'],
			['bq', 'bp', '', '', '', '', 'wp', 'wq'],
			['bK', 'bp', '', '', '', '', 'wp', 'wK'],
			['bb', 'bp', '', '', '', '', 'wp', 'wb'],
			['bk', 'bp', '', '', '', '', 'wp', 'wk'],
			['br', 'bp', '', '', '', '', 'wp', 'wr'],
		],
		legalState: [
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
		],
	}"
	x-init="
		board = $el.getContext('2d');
		for (let i=0; i<8; i++) {
			for (let j=0; j<8; j++) {
				if (i % 2 == j % 2) {
					board.fillStyle = lightSquare;
				} else {
					board.fillStyle = darkSquare;
				}
				board.fillRect(i*squareDim, j*squareDim, squareDim, squareDim);
			}
		};

		board.lineWidth = 2;
		board.textAlign = 'center';
		board.lineWidth = 2;
		board.font = '50px DejaVu';
		board.textAlign = 'center';
    ctx = board;
    ${drawBoardState}
  "
>
</canvas>

<canvas
 id='pieceCanvas'
 width=400
 height=400
	style="
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	"
	x-data="{
		boardCanvas: {},
		board: {},
		pieces: {},
    ctx: {},
		squareDim: 50,
		darkPiece: 'black',
		lightPiece: 'white',
		darkSquare: 'rgb(150, 150, 150)',
		lightSquare: 'rgb(240, 240, 240)',
		pieceVerticalOffset: 7,
		boardState: [
			['br', 'bp', '', '', '', '', 'wp', 'wr'],
			['bk', 'bp', '', '', '', '', 'wp', 'wk'],
			['bb', 'bp', '', '', '', '', 'wp', 'wb'],
			['bq', 'bp', '', '', '', '', 'wp', 'wq'],
			['bK', 'bp', '', '', '', '', 'wp', 'wK'],
			['bb', 'bp', '', '', '', '', 'wp', 'wb'],
			['bk', 'bp', '', '', '', '', 'wp', 'wk'],
			['br', 'bp', '', '', '', '', 'wp', 'wr'],
		],
		legalState: [
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
		],
		savedLegalState: [
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
		],
    activeField: [9,9],
		holding: '',
		chessPiece: '',
    move(){},
    drag: '',
    touched: false,
    lastTouched: false,
    movePartA: [9,9],
	}"
	@mousedown="
		lastPosX = Math.floor($event.offsetX/50);
		lastPosY = Math.floor($event.offsetY/50);
    if (boardState[lastPosX][lastPosY][0]=='w') {
      if (lastTouched == false) {
        touched = true;
        movePartA = [lastPosX, lastPosY];
      } else {
        touched = false;
        movePartA = [9, 9];
      };
      activeField = [lastPosX, lastPosY];
      switch (boardState[lastPosX][lastPosY][1]) {
        case 'p':
          if (boardState[lastPosX][lastPosY-1]=='') {
            legalState[lastPosX][lastPosY-1]='x';
          };
          if (lastPosY==6 && boardState[lastPosX][lastPosY-2]=='') {
            legalState[lastPosX][lastPosY-2]='x';
          };
          if (lastPosX > 0 && boardState[lastPosX-1][lastPosY-1][0]=='b') {
            legalState[lastPosX-1][lastPosY-1]='x';
          };
          if (lastPosX < 7 && boardState[lastPosX+1][lastPosY-1][0]=='b') {
            legalState[lastPosX+1][lastPosY-1]='x';
          };
          break;
        case 'r': console.log('rook'); break;
        case 'k': console.log('knight'); break;
        case 'b': console.log('bishop'); break;
        case 'q': console.log('queen'); break;
        case 'K': console.log('king'); break;
        default: break;
      };
    ctx = pieces;
    ${drawBoardState}

    drag = boardState[lastPosX][lastPosY];
		boardState[lastPosX][lastPosY] = '';

    dragPiece.fillStyle = lightPiece;
    pieces.fillStyle = lightPiece;
    
    chessPiece = '';
    switch (drag[1]) {
      case 'p': chessPiece = '\u265f'; break;
      case 'r': chessPiece = '\u265c'; break;
      case 'k': chessPiece = '\u265e'; break;
      case 'b': chessPiece = '\u265d'; break;
      case 'q': chessPiece = '\u265b'; break;
      case 'K': chessPiece = '\u265a'; break;
      default: break;
    };

    ctxX = lastPosX;
    ctxY = lastPosY;
    ${borderYellow}

    pieces.fillStyle = lightPiece;
    pieces.fillText(chessPiece, $event.offsetX, $event.offsetY - pieceVerticalOffset + 25);
    pieces.strokeText(chessPiece, $event.offsetX, $event.offsetY - pieceVerticalOffset + 25);

    move = (e) => {
      ctx = pieces;
      ${drawBoardState}

      ctxX = lastPosX;
      ctxY = lastPosY;
      ${borderYellow}
      ctxX = Math.floor(e.offsetX/50);
      ctxY = Math.floor(e.offsetY/50);
      if ((ctxX != lastPosX) || (ctxY != lastPosY)) {
        touched = false;
      } else {
        touched = true;
      };
      if (legalState[ctxX][ctxY] == 'x' || (ctxX == lastPosX && ctxY == lastPosY)) {
        ${borderYellow}
      };

      dragPiece.clearRect(0, 0, $el.width, $el.height);

      if (boardState[ctxX][ctxY] != '') {
        ${drawPiece}
      };

      pieces.fillStyle = lightPiece;
      pieces.fillText(chessPiece, e.offsetX, e.offsetY - pieceVerticalOffset + 25);
      pieces.strokeText(chessPiece, e.offsetX, e.offsetY - pieceVerticalOffset + 25);

    };
    $el.addEventListener('mousemove', move);
  } else {
    ctx = pieces;
    ${drawBoardState}
  }
	"
	@mouseup="
    if (drag != '') {
    $el.removeEventListener('mousemove', move);

		dragPiece.clearRect(0, 0, $el.width, $el.height);

		for (let i=0; i<8; i++) {
			for (let j=0; j<8; j++) {
				if (i % 2 == j % 2) {
					dragPiece.fillStyle = lightSquare;
				} else {
					dragPiece.fillStyle = darkSquare;
				}
				dragPiece.fillRect(i*squareDim, j*squareDim, squareDim, squareDim);
			}
		};

			let x = Math.floor(($event.offsetX)/squareDim);
			let y = Math.floor(($event.offsetY)/squareDim);
			if (legalState[x][y] == '') {
				[drag, boardState[lastPosX][lastPosY]] = ['', drag];
        ctxX = lastPosX;
        ctxY = lastPosY;
        if (x != lastPosX || y !=lastPosY) { 
          touched = false;
          lastTouched = false;
          movePartA = [9, 9];
        } else {
        }
			} else {
				[drag, boardState[x][y]] = ['', drag];
        touched = false;
        lastTouched = false;
        movePartA = [9, 9];
			}

    savedLegalState = legalState;
		legalState = [
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
		];
    ctx = pieces;
    ${drawBoardState}
    } else {
      if (savedLegalState[lastPosX][lastPosY] == 'x'){
        boardState[lastPosX][lastPosY] = boardState[movePartA[0]][movePartA[1]];
        boardState[movePartA[0]][movePartA[1]] = '';
        ctx = pieces;
        ${drawBoardState}
      };
      lastTouched = false;
      touched = false;
    };
    if (touched) {
      lastTouched=!lastTouched
    } else {
      lastTouched=false;
    };
    if (lastTouched) {
      ctx = pieces;
      ${drawBoardState}
      ${borderYellow}
      ${drawPiece}
    };
	"
	x-init="
		pieces = $el.getContext('2d');
		pieces.lineWidth = 2;
		pieces.textAlign = 'center';
		pieces.lineWidth = 2;
		pieces.font = '50px DejaVu';
		pieces.textAlign = 'center';
    
		dragPiece = document.getElementById('dragCanvas').getContext('2d');
		dragPiece.lineWidth = 2;
		dragPiece.textAlign = 'center';
		dragPiece.lineWidth = 2;
		dragPiece.font = '50px DejaVu';
		dragPiece.textAlign = 'center';

    console.log('init');
	"
>
</canvas>
<canvas
 id='dragCanvas'
 width=400
 height=400
	style="
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	"
>
</canvas>
</div>
</template>
    `
  );
});

app.get('/math', (c) => {
  return c.html(
    html`
<template x-teleport="#content">
<div id="content-math" x-show="$store.contentCurrent == 'math'">
math-data
</div>
</template>
    `
  );
});

app.get('/notes', (c) => {
  return c.html(
    html`
<template x-teleport="#content">
<div id="content-notes" x-show="$store.contentCurrent == 'notes'">
notes-data
</div>
</template>
    `
  );
});

export default app;
