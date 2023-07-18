import Timer from './Timer'
import { Box } from './Styled.js'
import { useEffect, useContext } from 'react';
import { AppContext } from './App';

const boardSize = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numberOfMines = 10;

export default function Game() {
  const { mineLocation, setMineLocation } = useContext(AppContext);

  const mineGenerator = (numberOfMines) => {
    let currentMines = 0;
    const minePositions = [];
    while (numberOfMines > currentMines) {
      minePositions.push(
        { row: Math.floor(Math.random() * 10) + 1, col: Math.floor(Math.random() * 10) + 1 }
      )
      currentMines = minePositions.length;
    }
    // store mine positions
    setMineLocation(minePositions);
    console.log(minePositions);
  }

  const mineChecker = (row, col, box) => {
    if(box.dataset.status !== 'flagged') {
      for (let mine of mineLocation) {
        if (mine.row === Number(row) && mine.col === Number(col)) {
          console.log('stepped on a mine')
          for (let i = 0; i < mineLocation.length; i++) {
            for (let box of document.querySelector('tbody').childNodes[i].childNodes) {
              for (let bomb of mineLocation) {
                if (Number(box.dataset['row']) === bomb['row'] && Number(box.dataset['col']) === bomb['col']) {
                  box.dataset['mine'] = true;
                }
              }
            }
          }
        } else {
          box.dataset.status = 'clicked'
        }
      }
    }
  }

  const flag = (target) => {
    if(target.dataset.status === 'hidden') {
      target.dataset.status = 'flagged';
      document.querySelector('.mine-count').textContent --;
    } else if(target.dataset.status === 'flagged') {
      target.dataset.status = 'hidden';
      document.querySelector('.mine-count').textContent ++;
    }
  }

  useEffect(() => {
    mineGenerator(numberOfMines);
  }, [])

  return (
    <>
      <div className='header-section'>
        <h1>Minesweeper</h1>
      </div>
      <div className='timer-section'>
        <Timer />
      </div>
      <div className='game-section'>
        Mines Left: <span className='mine-count'>10</span>
        <table>
          <tbody>
            {boardSize.map((row, index) => {
              return (
                <tr className='row' key={index}>
                  {boardSize.map((box, index) => {
                    return (
                      <Box
                        className='box'
                        key={index}
                        data-row={row}
                        data-col={box}
                        data-status='hidden'
                        onClick={(e) => {
                          mineChecker(e.currentTarget.dataset.row, e.currentTarget.dataset.col, e.currentTarget)
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          flag(e.currentTarget);
                        }}
                      ></Box>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}