import React from "react";
import "./Node.css";

const Node: React.FC<NodeProps> = ({
  node,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const { row, col, isStart, isEnd, isWall, isVisited, isPath } = node;

  const getNodeClass = () => {
    if (isStart) return "node-start";
    if (isEnd) return "node-end";
    if (isWall) return "node-wall";
    if (isPath) return "node-path";
    if (isVisited) return "node-visited";
    return "";
  };

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${getNodeClass()}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default React.memo(Node);
