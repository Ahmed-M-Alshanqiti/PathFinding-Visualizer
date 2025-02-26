import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createGrid } from "../../utils/createGrid";
import Node from "../node/Node";
import { useState } from "react";
import { dijkstra } from "../../algorithms/dijkstra";
const Grid = () => {
    const [selectedButton, setSelectedButton] = useState("startNode");
    const [grid, setGrid] = useState(createGrid(10, 20));
    const [, setHasStartNode] = useState(false);
    const [, setHasEndNode] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const handelSelectedButton = (e) => {
        setSelectedButton(e.currentTarget.value);
    };
    const handleMouseDown = (row, col) => {
        setIsMouseDown(true);
        updateGrid(row, col);
    };
    const handleMouseEnter = (row, col) => {
        if (isMouseDown) {
            updateGrid(row, col);
        }
    };
    const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    const handleStart = () => {
        const startNode = grid.flat().find((node) => node.isStart);
        const endNode = grid.flat().find((node) => node.isEnd);
        if (!startNode || !endNode) {
            alert("Please set both start and end nodes!");
            return;
        }
        const { visitedNodesInOrder, path } = dijkstra(grid, startNode, endNode);
        animateAlgorithm(visitedNodesInOrder, path);
    };
    const animateAlgorithm = (visitedNodes, path) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animatePath(path);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                setGrid((prevGrid) => prevGrid.map((row) => row.map((gridNode) => gridNode.row === node.row && gridNode.col === node.col
                    ? { ...gridNode, isVisited: true }
                    : gridNode)));
            }, 10 * i);
        }
    };
    const animatePath = (path) => {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const node = path[i];
                setGrid((prevGrid) => prevGrid.map((row) => row.map((gridNode) => gridNode.row === node.row && gridNode.col === node.col
                    ? { ...gridNode, isPath: true }
                    : gridNode)));
            }, 50 * i);
        }
    };
    const updateGrid = (row, col) => {
        const newGrid = grid.map((gridRow) => gridRow.map((node) => {
            const newNode = { ...node };
            // Handle start node placement
            if (selectedButton === "startNode") {
                // If clicking on existing start node, remove it
                if (newNode.isStart) {
                    newNode.isStart = false;
                    setHasStartNode(false);
                }
                else if (node.row === row && node.col === col) {
                    const prevStart = grid.flat().find((n) => n.isStart);
                    console.log(grid, prevStart, "im here#####");
                    if (prevStart) {
                        prevStart.isStart = false;
                    }
                    newNode.isStart = true;
                    setHasStartNode(true);
                }
            }
            if (selectedButton === "endNode") {
                if (newNode.isEnd) {
                    newNode.isEnd = false;
                    setHasEndNode(false);
                }
                else if (node.row === row && node.col === col) {
                    const prevEnd = grid.flat().find((n) => n.isEnd);
                    if (prevEnd) {
                        prevEnd.isEnd = false;
                    }
                    newNode.isEnd = true;
                    setHasEndNode(true);
                }
            }
            if (selectedButton === "wallNode") {
                if (node.row === row && node.col === col) {
                    newNode.isWall = !newNode.isWall;
                }
            }
            return newNode;
        }));
        setGrid(newGrid);
    };
    const clearGrid = () => {
        const newGrid = grid.map((row) => row.map((node) => ({
            ...node,
            isVisited: false,
            isPath: false,
            distance: node.isStart ? 0 : Infinity,
            previousNode: null,
        })));
        setGrid(newGrid);
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-around pb-8 pt-4 items-center", children: [_jsx("button", { value: "startNode", onClick: handelSelectedButton, className: `bg-gray-200 w-20 h-12 shadow-2xl flex hover:cursor-pointer items-center justify-center ${selectedButton === "startNode" ? "ring-2 ring-blue-500" : ""}`, children: "start node" }), _jsx("button", { value: "endNode", onClick: handelSelectedButton, className: `bg-gray-200 w-20 h-12 shadow-2xl flex hover:cursor-pointer items-center justify-center ${selectedButton === "endNode" ? "ring-2 ring-blue-500" : ""}`, children: "end node" }), _jsx("button", { value: "wallNode", onClick: handelSelectedButton, className: `bg-gray-200 w-20 h-12 shadow-2xl flex hover:cursor-pointer items-center justify-center ${selectedButton === "wallNode" ? "ring-2 ring-blue-500" : ""}`, children: "wall node" })] }), grid.map((row, rowIdx) => (_jsx("div", { className: "flex", children: row.map((node, nodeIdx) => (_jsx(Node, { node: node, onMouseDown: handleMouseDown, onMouseEnter: handleMouseEnter, onMouseUp: handleMouseUp }, nodeIdx))) }, rowIdx))), _jsx("div", { className: "flex justify-center items-center ", children: _jsxs("div", { className: "flex justify-center items-center gap-4", children: [_jsx("button", { onClick: () => handleStart(), className: "mt-8 border-2 rounded-2xl hover:cursor-pointer bg-gray-100 w-20 h-20 flex items-center justify-center", children: "Start" }), _jsx("button", { onClick: clearGrid, className: "mt-8 border-2 rounded-2xl hover:cursor-pointer bg-red-100 w-20 h-20 flex items-center justify-center", children: "Clear" })] }) })] }));
};
export default Grid;
