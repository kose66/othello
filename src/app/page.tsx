'use client';

import { useState } from 'react';
import styles from './page.module.css';

//再帰関数
const calcrateWhitePoint = (board: number[][]) => {
  let count = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x] === 2) {
        count = count + 1;
      }
    }
  }
  return count;
};
const calcrateBlackPoint = (board: number[][]) => {
  let count = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x] === 1) {
        count = count + 1;
      }
    }
  }
  return count;
};

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

  type Position = { x: number; y: number };

  function legalMoves(board: number[][], player: number): Position[] {
    const opp = player === 1 ? 2 : 1;

    //const hasValidMove = (b: number[][], color: number): boolean => {
      const dirs = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
      ];

      // const countStone = (b: number[][]) => {
      //   let black = 0;
      //   let white = 0;
      //   for (let y = 0; y < 8; y++) {
      //     for (let x = 0; x < 8; x++) {
      //       if (b[y][x] === 1) black++;
      //       if (b[y][x] === 2) white++;
      //     }
      //   }
      //   return { black, white };
      // };

      const legalMoves: Position[] = [];
      const opp = 3 - color;
      //8*8
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (board[y][x] !== 0) continue; //0じゃないとスキップ
          //for ofはpythonのfor in イメージ
          for (const [dx, dy] of dirs) {
            let nx = x + dx;
            let ny = y + dy;
            let found = false;

            while (board[ny]?.[nx] === opp) {
              nx += dx;
              ny += dy;
              found = true;
            }

            if (found && board[ny]?.[nx] === color) {
              legalMoves.push({ x, y });
            }
          }
        }
      }

      return legalMoves;
    };

  }

  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 0) return;

    console.log(x, y);
    //直接boardを変更すると問題が起きるから安全にコピー
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
    ];

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

    if (hasValidMove(newBoard, opp)) {
      setTurnColor(opp);
    } else if (hasValidMove(newBoard, my)) {
      alert('あなたの番です。');
      setTurnColor(my);
    } else {
      alert('両者置けません。ゲーム終了');
    }
  };

  return (
    <div className={styles.container}>
      <div>{calcrateBlackPoint(board)}</div>
      <div>{calcrateWhitePoint(board)}</div>
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
              {isHint && <div className={styles.hint} />}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
