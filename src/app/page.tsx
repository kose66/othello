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
    if (board[y][x] !== 0) return;

    console.log(x, y);
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

    const my = turnColor;
    const opp = 3 - turnColor;
    const toFlip: { x: number; y: number }[] = [];

    for (const [dx, dy] of dirs) {
      let nx = x + dx;
      let ny = y + dy;
      const line: { x: number; y: number }[] = [];

      while (board[ny]?.[nx] === opp) {
        line.push({ x: nx, y: ny });
        nx += dx;
        ny += dy;
      }

      if (line.length > 0 && board[ny]?.[nx] === my) {
        toFlip.push(...line);
      }
    }

    if (toFlip.length === 0) return;

    newBoard[y][x] = my;
    toFlip.forEach(({ x, y }) => {
      newBoard[y][x] = my;
    });

    setBoard(newBoard);
    setTurnColor(opp);
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
