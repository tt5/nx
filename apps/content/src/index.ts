// src/index.ts
import { Hono } from 'hono';
import { html, raw } from 'hono/html';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());

app.get('/home', (c) => {
  //c.header('Cache-Control', 'private, max-age=60')
  return c.html(
    html`
      <div
        id="content-home"
        x-show="$store.contentCurrent == 'home'"
      >
        <p
          style="
            font-family: 'alpha2';
            width: 0;
            height: 0;
            padding: 0;
            overflow: hidden;
          "
        >
          ijklmn<br />
          IJKLMN
        </p>
        <div class="grid grid-cols-[auto_1fr_auto]">
        <div style="width: 20vw; height: 20vh;"></div>
        <div></div>
        <div></div>
        <div></div>
        <section class="flex flex-col px-2">
          <div>
            <a href="https://tasteless-property.surge.sh/">notes</a>
            &emsp;
            vitepress, katex
          </div>
          <div>
            <a href="https://taupe-fudge-311cb1.netlify.app/">example</a>
            &emsp;
            react
          </div>
          <div>
            <a href="https://astro-8s2.pages.dev">blog</a>
            &emsp;
            astro
          </div>
          <div>
            <a href="https://next-tt5.vercel.app">example</a>
            &emsp;
            Next, supabase
          </div>
          <div>
            <a href="https://t3-app-v0.vercel.app/">example</a>
            &emsp;
            t3-app
          </div>
          <div>
            <a href="/projects/blog-first/">experiment</a>
            &emsp;
            fastify, graphviz, lua-lpeg, alpinejs
          </div>
        </section>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>
      </div>
    `
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
						case 'p': chessPieceA = 'I'; break;
						case 'r': chessPieceA = 'L'; break;
						case 'k': chessPieceA = 'K'; break;
						case 'b': chessPieceA = 'J'; break;
						case 'q': chessPieceA = 'M'; break;
						case 'K': chessPieceA = 'N'; break;
						default: break;
					};
					ctx.fillText(chessPieceA, i*squareDim + squareDim/2 + pieceXOffset, j*squareDim + squareDim - pieceVerticalOffset);
					ctx.strokeText(chessPieceA, i*squareDim + squareDim/2 + pieceXOffset, j*squareDim + squareDim - pieceVerticalOffset);
				};
			};
      `;

  const borderYellow = `
    pieces.fillStyle = 'yellow';
    pieces.fillRect(ctxX*squareDim, ctxY*squareDim, squareDim, squareDim);
    if (((ctxX + ctxY*8 - ctxY) % 2) == 1) {
      pieces.fillStyle = darkSquare;
    } else {
      pieces.fillStyle = lightSquare;
    };
		pieces.fillRect(ctxX*squareDim+5, ctxY*squareDim+5, squareDim-10, squareDim-10);
      `;

  const drawPiece = `
					if (boardState[ctxX][ctxY][0] == 'b') {
						pieces.fillStyle = darkPiece;
					} else {
						pieces.fillStyle = lightPiece;
					};
					chessPieceB = '';
					switch (boardState[ctxX][ctxY][1]) {
						case 'p': chessPieceB = 'I'; break;
						case 'r': chessPieceB = 'L'; break;
						case 'k': chessPieceB = 'K'; break;
						case 'b': chessPieceB = 'J'; break;
						case 'q': chessPieceB = 'M'; break;
						case 'K': chessPieceB = 'N'; break;
						default: break;
					};
					pieces.fillText(chessPieceB, ctxX*squareDim + squareDim/2 + pieceXOffset, ctxY*squareDim + squareDim - pieceVerticalOffset);
					pieces.strokeText(chessPieceB, ctxX*squareDim + squareDim/2 + pieceXOffset, ctxY*squareDim + squareDim - pieceVerticalOffset);
          `;

  return c.html(
    html`
      <template x-teleport="#content">
        <div
          id="content-chess"
          x-show="$store.contentCurrent == 'chess'"
        >
          <div
            style="
      height: 50px;
    "
          >
            &nbsp;
          </div>
          <span
            style="
      display: inline-block;
      min-height: 405px;
      width: 50px;
    "
            >&nbsp;</span
          >
          <span
            style="
      position: relative;
      height: 400px;
      width: 400px;
    "
          >
            <canvas
              style="
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
      "
              id="boardCanvas"
              width="400"
              height="400"
              x-data="{
        board: {}, 
        ctx: {}, 
        squareDim: 50,
        pieceVerticalOffset: 7,
        pieceXOffset: 3,
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
        board.font = '50px alpha2';
        ctx = board;
        ${drawBoardState}
      "
            >
            </canvas>

            <canvas
              id="pieceCanvas"
              width="400"
              height="400"
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
        pieceXOffset: 3,
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
        console.log(JSON.stringify(activeField), lastPosX, lastPosY);
        if ((activeField[0] != lastPosX) || (activeField[1] != lastPosY)) {
        console.log('changed', JSON.stringify(movePartA), lastTouched);
          if (lastTouched == false) {
            if (lastTouched == false) {
              touched = true;
              movePartA = [lastPosX, lastPosY];
            } else {
              touched = false;
              movePartA = [9, 9];
            };
          } else {
            console.log('here', lastTouched);
            touched = true;
            movePartA = [lastPosX, lastPosY];
            lastTouched = false;
          }
        } else {
        }
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
            case 'r':
              for (var i = lastPosY; i > 0; --i) {
                if (boardState[lastPosX][i-1]=='') {
                  legalState[lastPosX][i-1]='x';
                } else {
                  if (boardState[lastPosX][i-1][0]=='b') {
                    legalState[lastPosX][i-1]='x';
                    break;
                  }
                  if (boardState[lastPosX][i-1][0]=='w') {
                    break;
                  }
                };
              };
              for (var i = lastPosY; i < 7; ++i) {
                if (boardState[lastPosX][i+1]=='') {
                  legalState[lastPosX][i+1]='x';
                } else {
                  if (boardState[lastPosX][i+1][0]=='b') {
                    legalState[lastPosX][i+1]='x';
                    break;
                  }
                  if (boardState[lastPosX][i+1][0]=='w') {
                    break;
                  }
                };
              };
              for (var i = lastPosX; i > 0; --i) {
                if (boardState[i-1][lastPosY]=='') {
                  legalState[i-1][lastPosY]='x';
                } else {
                  if (boardState[i-1][lastPosY][0]=='b') {
                    legalState[i-1][lastPosY]='x';
                    break;
                  }
                  if (boardState[i-1][lastPosY][0]=='w') {
                    break;
                  }
                };
              };
              for (var i = lastPosX; i < 7; ++i) {
                if (boardState[i+1][lastPosY]=='') {
                  legalState[i+1][lastPosY]='x';
                } else {
                  if (boardState[i+1][lastPosY][0]=='b') {
                    legalState[i+1][lastPosY]='x';
                    break;
                  }
                  if (boardState[i+1][lastPosY][0]=='w') {
                    break;
                  }
                };
              };
              break;
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
          case 'p': chessPiece = 'I'; break;
          case 'r': chessPiece = 'L'; break;
          case 'k': chessPiece = 'K'; break;
          case 'b': chessPiece = 'J'; break;
          case 'q': chessPiece = 'M'; break;
          case 'K': chessPiece = 'N'; break;
          default: break;
        };

        ctxX = lastPosX;
        ctxY = lastPosY;
        ${borderYellow}

        pieces.fillStyle = lightPiece;
        pieces.fillText(chessPiece, $event.offsetX + pieceXOffset, $event.offsetY - pieceVerticalOffset + 25);
        pieces.strokeText(chessPiece, $event.offsetX + pieceXOffset, $event.offsetY - pieceVerticalOffset + 25);

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
        pieces.font = '50px alpha2';
        
        dragPiece = document.getElementById('dragCanvas').getContext('2d');
        dragPiece.lineWidth = 2;
        dragPiece.textAlign = 'center';
        dragPiece.font = '50px alpha2';

        console.log('init');
      "
            >
            </canvas>
            <canvas
              id="dragCanvas"
              width="400"
              height="400"
              style="
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	"
            >
            </canvas>
          </span>
        </div>
      </template>
    `
  );
});

app.get('/math', (c) => {
  return c.html(
    html`
      <template x-teleport="#content">
        <div
          id="content-math"
          x-show="$store.contentCurrent == 'math'"
        >
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
        <div
          id="content-notes"
          x-show="$store.contentCurrent == 'notes'"
        >
          notes-data
        </div>
      </template>
    `
  );
});

export default app;
