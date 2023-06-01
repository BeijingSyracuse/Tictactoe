import React, { useEffect, useState } from "react";
import Square from "./Square";

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const handleClick = (e) => {
    if (!winner && !board[e.target.value]) {
      let newBoard = board.slice();
      newBoard[e.target.value] = player;
      setBoard(newBoard);

      switchPlayer();
    }
  };

  const switchPlayer = () => {
    setPlayer(player === "X" ? "O" : "X");
  };

  useEffect(() => {
    const options = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let isFull = true;
    board.forEach((square) => {
      if (!square) {
        isFull = false;
      }
    });

    options.forEach((option) => {
      const [i, j, k] = [...option];
      if (
        board[i] &&
        board[j] &&
        board[k] &&
        board[i] === board[j] &&
        board[i] === board[k]
      ) {
        setWinner(board[i]);
        return true; // someone win
      } else if (isFull) {
        setWinner("draw");
        return true; // draw
      } else {
        return false; // continue
      }
    });
  }, [board, winner]);

  return (
    <div>
      <p>Player: {player}</p>
      <p>Winner: {winner}</p>
      <div className="board" onClick={handleClick}>
        {[0, 1, 2].map((i) => (
          <div key={`row-${i}`} className="row">
            {[0, 1, 2].map((j) => (
              <Square
                key={i * 3 + j}
                value={i * 3 + j}
                player={board[i * 3 + j]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
