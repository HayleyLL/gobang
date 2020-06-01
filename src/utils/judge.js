export const check = (lineArr, current) => {
  let count = 0;
  for (const idx in lineArr) {
    if (lineArr[idx] === current) {
      count += 1;
      if (count === 5) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  return false;
};

export const checkA = (row, current) => {
  return check(row, current);
};

export const checkB = (column, data, current) => {
  const columnValues = data.map((item) => item[column]);
  return check(columnValues, current);
};

export const checkC = (row, column, data, current) => {
  let min = Math.min(row, column);
  let startX = row - min;
  let startY = column - min;

  let values = [];
  let size = data.length;
  while (1) {
    values.push(data[startX][startY]);
    startX += 1;
    startY += 1;
    if (startX >= size || startY >= size) {
      break;
    }
  }
  return check(values, current);
};

export const getXY = (row, column, size) => {
  let x = row + column;
  let y = 0;

  if (x > size - 1) {
    return [size - 1, y - (size - 1 - x)];
  } else {
    return [x, 0];
  }
};

export const checkD = (row, column, data, current) => {
  let size = data.length;
  let [startX, startY] = getXY(row, column, size);

  let values = [];
  while (1) {
    values.push(data[startX][startY]);
    startX -= 1;
    startY += 1;
    if (startX < 0 || startY >= size) {
      break;
    }
  }
  return check(values, current);
};

export const checkWinner = (row, column, data) => {
  let current = data[row][column];
  return (
    checkA(data[row], current) ||
    checkB(column, data, current) ||
    checkC(row, column, data, current) ||
    checkD(row, column, data, current)
  );
};
