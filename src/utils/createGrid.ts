export const createGrid = (rows: number, cols: number): NodeType[][] => {
  const grid: NodeType[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: NodeType[] = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        row: i,
        col: j,
        isStart: false,
        isEnd: false,
        isWall: false,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null,
      });
    }
    grid.push(row);
  }
  return grid;
};
