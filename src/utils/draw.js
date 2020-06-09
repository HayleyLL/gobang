export default function Drawer(padding, cellSize, cells, chessR) {
  this.padding = padding;
  this.cellSize = cellSize;
  this.cells = cells;
  this.chessR = chessR;
  this.size = cells * cellSize + 2 * padding;

  this.drawBoard = function (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeRect(0, 0, this.size, this.size);

      for (let i = 0; i <= cells; i++) {
        ctx.moveTo(padding + i * cellSize, padding);
        ctx.lineTo(padding + i * cellSize, this.size - padding);
        ctx.stroke();
        ctx.moveTo(padding, padding + i * cellSize);
        ctx.lineTo(this.size - padding, padding + i * cellSize);
        ctx.stroke();
      }
    }
  };

  //role: black/white/none
  this.drawChess = function (ctx, coords, role) {
    const { x, y } = coords;

    ctx.beginPath();
    ctx.arc(x, y, chessR, 0, 2 * Math.PI);
    const grd = ctx.createRadialGradient(x, y, chessR, x, y, 0);
    if (role === "black") {
      grd.addColorStop(0, "#0A0A0A");
      grd.addColorStop(1, "#636766");
    } else if (role === "white") {
      grd.addColorStop(0, "#D1D1D1");
      grd.addColorStop(1, "#F9F9F9");
    }
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
  };

  // this.calcMousePosInWindow = function (e) {
  //   return { x: e.clientX, y: e.clientY };
  // };

  this.calcMouseCoords = function (canvas, e) {
    const cvsPos = canvas.getBoundingClientRect();
    const { clientX, clientY } = e;
    const x = Math.round(clientX - cvsPos.left);
    const y = Math.round(clientY - cvsPos.top);
    return { x, y };
  };

  this.calcChessCoords = function (canvas, e) {
    const { x, y } = this.calcMouseCoords(canvas, e);
    let xNum = Math.floor((x - padding) / cellSize + 1 / 2);
    let yNum = Math.floor((y - padding) / cellSize + 1 / 2);
    let chessPos = {
      x: xNum * cellSize + padding,
      y: yNum * cellSize + padding,
      xNum,
      yNum,
    };
    return chessPos;
  };

  this.clearChess = function (canvas) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
  };

  this.movChess = function (canvas, x, y, role) {
    const ctx = canvas.getContext("2d");
    this.clearChess(canvas);
    this.drawChess(ctx, { x, y }, role);
  };

  this.drawAllChess = function (chessData, canvas) {
    const ctx = canvas.getContext("2d");
    const calcPos = (xNum, yNum) => {
      return {
        x: xNum * cellSize + padding,
        y: yNum * cellSize + padding,
      };
    };

    for (let i in chessData) {
      for (let j in chessData[i]) {
        if (chessData[i][j] === 0) {
          continue;
        }
        const coords = calcPos(j, i);
        if (chessData[i][j] === 1) {
          this.drawChess(ctx, coords, "black");
        } else if (chessData[i][j] === 2) {
          this.drawChess(ctx, coords, "white");
        }
      }
    }
  };

  this.isMouseWithinBoard = function (x, y) {
    return (
      x >= this.padding &&
      x <= this.size - this.padding &&
      y >= this.padding &&
      y <= this.size - this.padding
    );
  };
}
