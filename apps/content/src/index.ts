// src/index.ts
import { Hono } from 'hono';
import { html } from 'hono/html';
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
		squareDim: 50,
		darkSquare: 'rgb(150, 150, 150)',
		lightSquare: 'rgb(240, 240, 240)',
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
    activeField: [9,9],
		holding: '',
		chessPiece: ''
	}"
	@mousedown="
		lastPosX = Math.floor($event.offsetX/50);
		lastPosY = Math.floor($event.offsetY/50);
    if (boardState[lastPosX][lastPosY]!='') {
    if (activeField[0] == lastPosX && activeField[1] == lastPosY) {
      activeField[0] = 9;
      activeField[1] = 9;
    } else {
    activeField[0] = lastPosX;
    activeField[1] = lastPosY;
      pieces.fillStyle = 'yellow';
      pieces.fillRect(lastPosX*squareDim, lastPosY*squareDim, squareDim, squareDim);
    }
		drag = [boardState[lastPosX][lastPosY], lastPosX, lastPosY];
		boardState[lastPosX][lastPosY] = '';
					if (drag[0][0] == 'b') {
						dragPiece.fillStyle = darkPiece;
						pieces.fillStyle = darkPiece;
					} else {
						dragPiece.fillStyle = lightPiece;
						pieces.fillStyle = lightPiece;
					};
					chessPiece = '';
					switch (drag[0][1]) {
						case 'p': chessPiece = '\u265f'; break;
						case 'r': chessPiece = '\u265c'; break;
						case 'k': chessPiece = '\u265e'; break;
						case 'b': chessPiece = '\u265d'; break;
						case 'q': chessPiece = '\u265b'; break;
						case 'K': chessPiece = '\u265a'; break;
						default: break;
					};
		pieces.clearRect(lastPosX*squareDim+5, lastPosY*squareDim+5, squareDim-10, squareDim-10);
					dragPiece.fillText(chessPiece, $event.offsetX, $event.offsetY - pieceVerticalOffset + 25);
					dragPiece.strokeText(chessPiece, $event.offsetX, $event.offsetY - pieceVerticalOffset + 25);
    move = (e) => {
      activeField[0] = 9;
      activeField[1] = 9;
      pieces.clearRect(lastPosX*squareDim, lastPosY*squareDim, squareDim, squareDim);
      nowX = Math.floor(e.offsetX/50);
      nowY = Math.floor(e.offsetY/50);
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
          if (((i + j*8 - j) % 2) == 1) {
            pieces.fillStyle = darkSquare;
          } else {
            pieces.fillStyle = lightSquare;
          };
					pieces.fillRect(i*squareDim, j*squareDim, squareDim, squareDim );
					if (boardState[i][j][0] == 'b') {
						pieces.fillStyle = darkPiece;
					} else {
						pieces.fillStyle = lightPiece;
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
					pieces.fillText(chessPieceA, i*squareDim + squareDim/2, j*squareDim + squareDim - pieceVerticalOffset);
					pieces.strokeText(chessPieceA, i*squareDim + squareDim/2, j*squareDim + squareDim - pieceVerticalOffset);
				};
			};
      pieces.fillStyle = 'yellow';
      pieces.fillRect(nowX*squareDim, nowY*squareDim, squareDim, squareDim);
      if (((nowX + nowY*8 - nowY) % 2) == 1) {
        pieces.fillStyle = darkSquare;
      } else {
        pieces.fillStyle = lightSquare;
      };
      pieces.fillRect(nowX*squareDim+5, nowY*squareDim+5, squareDim-10, squareDim-10);

      dragPiece.clearRect(0, 0, $el.width, $el.height);
      if (boardState[nowX][nowY] != '') {
					if (boardState[nowX][nowY][0] == 'b') {
						pieces.fillStyle = darkPiece;
					} else {
						pieces.fillStyle = lightPiece;
					};
					chessPieceB = '';
					switch (boardState[nowX][nowY][1]) {
						case 'p': chessPieceB = '\u265f'; break;
						case 'r': chessPieceB = '\u265c'; break;
						case 'k': chessPieceB = '\u265e'; break;
						case 'b': chessPieceB = '\u265d'; break;
						case 'q': chessPieceB = '\u265b'; break;
						case 'K': chessPieceB = '\u265a'; break;
						default: break;
					};
					pieces.fillText(chessPieceB, nowX*squareDim + squareDim/2, nowY*squareDim + squareDim - pieceVerticalOffset);
					pieces.strokeText(chessPieceB, nowX*squareDim + squareDim/2, nowY*squareDim + squareDim - pieceVerticalOffset);
      };
					if (drag[0][0] == 'b') {
						dragPiece.fillStyle = darkPiece;
						pieces.fillStyle = darkPiece;
					} else {
						dragPiece.fillStyle = lightPiece;
						pieces.fillStyle = lightPiece;
					};
            dragPiece.fillText(chessPiece, e.offsetX, e.offsetY - pieceVerticalOffset + 25);
            dragPiece.strokeText(chessPiece, e.offsetX, e.offsetY - pieceVerticalOffset + 25);
            pieces.fillText(chessPiece, e.offsetX, e.offsetY - pieceVerticalOffset + 25);
            pieces.strokeText(chessPiece, e.offsetX, e.offsetY - pieceVerticalOffset + 25);

        };
      $el.addEventListener('mousemove', move);
    }
	"
	@mouseup="
    $el.removeEventListener('mousemove', move);
		dragPiece.clearRect(0, 0, $el.width, $el.height);
		if (drag[0] != '') {
			let x = Math.floor(($event.offsetX)/squareDim);
			let y = Math.floor(($event.offsetY)/squareDim);
			if (boardState[x][y][0] != drag[0][0]) {
				boardState[x][y] = '';
			}
			if (boardState[x][y][0] == drag[0][0]) {
				[drag[0], boardState[lastPosX][lastPosY]] = ['', drag[0]];
			} else {
				[drag[0], boardState[x][y]] = ['', drag[0]];
			}

		pieces.clearRect(0, 0, $el.width, $el.height);
    if (activeField[0] == lastPosX && activeField[1] == lastPosY) {
      pieces.fillStyle = 'yellow';
      pieces.fillRect(lastPosX*squareDim, lastPosY*squareDim, squareDim, squareDim);
					if (((x + y*8 - y) % 2) == 1) {
						pieces.fillStyle = darkSquare;
					} else {
						pieces.fillStyle = lightSquare;
					};
      pieces.fillRect(lastPosX*squareDim+5, lastPosY*squareDim+5, squareDim-10, squareDim-10);
    } else { }
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					if (boardState[i][j][0] == 'b') {
						pieces.fillStyle = darkPiece;
					} else {
						pieces.fillStyle = lightPiece;
					};
					chessPiece = '';
					switch (boardState[i][j][1]) {
						case 'p': chessPiece = '\u265f'; break;
						case 'r': chessPiece = '\u265c'; break;
						case 'k': chessPiece = '\u265e'; break;
						case 'b': chessPiece = '\u265d'; break;
						case 'q': chessPiece = '\u265b'; break;
						case 'K': chessPiece = '\u265a'; break;
						default: break;
					};
					pieces.fillText(chessPiece, i*squareDim + squareDim/2, j*squareDim + squareDim - pieceVerticalOffset);
					pieces.strokeText(chessPiece, i*squareDim + squareDim/2, j*squareDim + squareDim - pieceVerticalOffset);
				};
			};
		}
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
