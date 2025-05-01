'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);

    const direction = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ];

    if (
      board[y][x] === 0 &&
      board[y + 1] !== undefined &&
      board[y + 2] !== undefined &&
      board[y + 1][x] === 3 - turnColor &&
      board[y + 2][x] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      newBoard[y + 1][x] = turnColor;
      setTurnColor(3 - turnColor);
    } else if (
      board[y][x] === 0 &&
      board[y - 1] !== undefined &&
      board[y - 2] !== undefined &&
      board[y - 1][x] === 3 - turnColor &&
      board[y - 2][x] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      newBoard[y - 1][x] = turnColor;
      setTurnColor(3 - turnColor);
    } else if (
      board[y][x] === 0 &&
      board[y][x + 1] !== undefined &&
      board[y][x + 2] !== undefined &&
      board[y][x + 1] === 3 - turnColor &&
      board[y][x + 2] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      newBoard[y][x + 1] = turnColor;
      setTurnColor(3 - turnColor);
    } else if (
      board[y][x] === 0 &&
      board[y][x - 1] !== undefined &&
      board[y][x - 2] !== undefined &&
      board[y][x - 1] === 3 - turnColor &&
      board[y][x - 2] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      newBoard[y][x - 1] = turnColor;
      setTurnColor(3 - turnColor);
    } else if (
      board[y][x] === 0 &&
      board[y + 1] !== undefined &&
      board[y + 2] !== undefined &&
      board[y + 1][x + 1] !== undefined &&
      board[y + 2][x + 2] !== undefined &&
      board[y + 1][x + 1] === 3 - turnColor &&
      board[y + 2][x + 2] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      newBoard[y + 1][x + 1] = turnColor;
      setTurnColor(3 - turnColor);
    } else if (
      board[y][x] === 0 &&
      board[y - 1] !== undefined &&
      board[y - 2] !== undefined &&
      board[y - 1][x + 1] !== undefined &&
      board[y - 2][x + 2] !== undefined &&
      board[y - 1][x + 1] === 3 - turnColor &&
      board[y - 2][x + 2] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      newBoard[y - 1][x + 1] = turnColor;
      setTurnColor(3 - turnColor);
    } else if (
      board[y][x] === 0 &&
      board[y + 1] !== undefined &&
      board[y + 2] !== undefined &&
      board[y + 1][x - 1] !== undefined &&
      board[y + 2][x - 2] !== undefined &&
      board[y + 1][x - 1] === 3 - turnColor &&
      board[y + 2][x - 2] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      newBoard[y + 1][x - 1] = turnColor;
      setTurnColor(3 - turnColor);
    } else if (
      board[y][x] === 0 &&
      board[y - 1] !== undefined &&
      board[y - 2] !== undefined &&
      board[y - 1][x - 1] !== undefined &&
      board[y - 2][x - 2] !== undefined &&
      board[y - 1][x - 1] === 3 - turnColor &&
      board[y - 2][x - 2] === turnColor
    ) {
      newBoard[y][x] = turnColor;
      newBoard[y - 1][x - 1] = turnColor;
      setTurnColor(3 - turnColor);
    }

    setBoard(newBoard);

    if (board[y][x] !== 0) return;

    const newBoard = structuredClone(board);

    const dirs = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ] as const;

    //ひっくり返すセルを集める
    const toFlip: {x: number, y: number}[] = [];
    const my = turnColor;
    const opp = 3 - turnColor;

    for (const [dx, dy] of dirs){
      let nx = x + dx;
      let ny = y + dy;
      const line: {x: number y: number}[] = [];

      //相手の石が連続する限り進む
      while (board[ny]?.[nx] === opp) {
        line.push({x: nx, y: ny});
        nx += dx;
        ny += dy;
      }

      //連続の先に自分の石があれば
      if(line.length > 0 && board[ny]?.[nx] === my){
        toFlip.push(...line);
      }
    }
    if (toFlip.length === 0) return;

    newBoard[y][x] = my;
    toFlip.forEach(p => {
      newBoard[p.y][p.x] = my;
    });
    setBoard(newBoard);
    setTurnColor(opp)
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
