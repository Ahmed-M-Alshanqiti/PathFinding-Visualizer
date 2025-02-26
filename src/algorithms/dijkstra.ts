export const dijkstra = (
  originalGrid: NodeType[][],
  startNode: NodeType,
  endNode: NodeType
) => {
  const grid = originalGrid.map((row) =>
    row.map((node) => ({
      ...node,
      distance: node.isStart ? 0 : Infinity,
      isVisited: false,
      previousNode: null,
    }))
  );

  const visitedNodesInOrder: NodeType[] = [];
  const start = grid[startNode.row][startNode.col];
  const end = grid[endNode.row][endNode.col];

  start.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);

    const closestNode = unvisitedNodes.shift()!;

    // Skip walls
    if (closestNode.isWall) continue;

    // If remaining nodes are unreachable
    if (closestNode.distance === Infinity) break;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    // Early exit if we reach the end
    if (closestNode === end) break;

    updateUnvisitedNeighbors(closestNode, grid);
  }

  const path = getPath(start, end); // Pass both start and end nodes
  return { visitedNodesInOrder, path };
};

const getAllNodes = (grid: NodeType[][]): NodeType[] => {
  return grid.flatMap((row) => row);
};

const sortNodesByDistance = (nodes: NodeType[]) => {
  nodes.sort((a, b) => a.distance - b.distance);
};

const updateUnvisitedNeighbors = (node: NodeType, grid: NodeType[][]) => {
  const neighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const getUnvisitedNeighbors = (
  node: NodeType,
  grid: NodeType[][]
): NodeType[] => {
  const neighbors: NodeType[] = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
};

const getPath = (startNode: NodeType, endNode: NodeType): NodeType[] => {
  const path: NodeType[] = [];
  let currentNode: NodeType | null = endNode;

  while (currentNode !== null) {
    if (currentNode !== endNode && currentNode !== startNode) {
      path.unshift(currentNode);
    }
    currentNode = currentNode.previousNode;
  }

  if (path.length > 0) {
    path.unshift(startNode);
    path.push(endNode);
  }

  return path;
};
