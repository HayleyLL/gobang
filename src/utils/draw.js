export function drawBoard(canvas, padding, cellSize, cells, size) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.strokeRect(0, 0, size, size);

    for (let i = 0; i <= cells; i++) {
      ctx.moveTo(padding + i * cellSize, padding);
      ctx.lineTo(padding + i * cellSize, size - padding);
      ctx.stroke();
      ctx.moveTo(padding, padding + i * cellSize);
      ctx.lineTo(size - padding, padding + i * cellSize);
      ctx.stroke();
    }
  }
}

export const drawChess = (ctx, coords, r, isBlack) => {
  const { x, y } = coords;

  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  const grd = ctx.createRadialGradient(x, y, r, x, y, 0);
  if (isBlack) {
    grd.addColorStop(0, "#0A0A0A");
    grd.addColorStop(1, "#636766");
  } else {
    grd.addColorStop(0, "#D1D1D1");
    grd.addColorStop(1, "#F9F9F9");
  }
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.closePath();
};

export const calcMousePos = (canvas, e) => {
  const cvsPos = canvas.getBoundingClientRect();
  const { clientX, clientY } = e;
  const x = Math.round(clientX - cvsPos.left);
  const y = Math.round(clientY - cvsPos.top);
  return { x, y };
};

export const calcChessCoords = (canvas, e, padding, cellSize) => {
  const { x, y } = calcMousePos(canvas, e);
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

export const clearChess = (canvas) => {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
};

export const movChess = (canvas, chessR, x, y, isBlackTurn) => {
  const ctx = canvas.getContext("2d");
  clearChess(canvas);
  drawChess(ctx, { x, y }, chessR, isBlackTurn);
};
