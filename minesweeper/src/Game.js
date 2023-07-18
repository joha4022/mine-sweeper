import Timer from './Timer'
import { Box, InfoDiv } from './Styled.js'
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

    for (let mine of minePositions) {
      for (let i = 0; i < minePositions.length; i++) {
        for (let box of document.querySelector('tbody').childNodes[i].childNodes) {
          for (let bomb of minePositions) {
            if (Number(box.dataset['row']) === bomb['row'] && Number(box.dataset['col']) === bomb['col']) {
              box.mine = true;
            }
          }
        }
      }
    }
    console.log(minePositions);
  }

  const mineChecker = (row, col, box) => {
    if (box.dataset.status !== 'flagged' && box.mine === true) {
      for (let mine of mineLocation) {
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
      }
    } else if (box.dataset.status !== 'flagged' && box.mine === undefined) {
      const previousRow = document.querySelector('tbody').childNodes[row - 2]
      const nextRow = document.querySelector('tbody').childNodes[row]
      let mineIndicator = 0;
      if(Number(row) === boardSize[0] && Number(col) === boardSize[0]) {
        if(box.nextSibling.mine === true) mineIndicator += 1; 
        if(nextRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        if(nextRow.childNodes[col].mine === true) mineIndicator += 1;
        console.log(mineIndicator);
      } else if(Number(row) === boardSize[0] && Number(col) === boardSize[boardSize.length-1]) {
        if(box.previousSibling.mine === true) mineIndicator += 1;
        if(nextRow.childNodes[col - 2].mine === true) mineIndicator += 1; 
        if(nextRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        console.log(mineIndicator);
      } else if(Number(row) === boardSize[0]) {
        if(box.previousSibling.mine === true) mineIndicator += 1;
        if(box.nextSibling.mine === true) mineIndicator += 1;
        if(nextRow.childNodes[col - 2].mine === true) mineIndicator += 1; 
        if(nextRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        if(nextRow.childNodes[col].mine === true) mineIndicator += 1;
        console.log(mineIndicator);
      } else if (Number(row) === boardSize[boardSize.length-1] && Number(col) === boardSize[0]) {
        if(previousRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        if(previousRow.childNodes[col].mine === true) mineIndicator += 1;
        if(box.nextSibling.mine === true) mineIndicator += 1;
        console.log(mineIndicator);
      } else if(Number(row) === boardSize[boardSize.length-1] && Number(col) === boardSize[boardSize.length-1]) {
        if(previousRow.childNodes[col - 2].mine === true) mineIndicator += 1; 
        if(previousRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        if(box.previousSibling.mine === true) mineIndicator += 1;
        console.log(mineIndicator);
      } else if(Number(row) === boardSize[boardSize.length-1]) {
        if(previousRow.childNodes[col - 2].mine === true) mineIndicator += 1; 
        if(previousRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        if(previousRow.childNodes[col].mine === true) mineIndicator += 1;
        if(box.previousSibling.mine === true) mineIndicator += 1;
        if(box.nextSibling.mine === true) mineIndicator += 1;
        console.log(mineIndicator);
      } else if(Number(col) === boardSize[0]) {
        if(previousRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        if(previousRow.childNodes[col].mine === true) mineIndicator += 1;
        if(box.nextSibling.mine === true) mineIndicator += 1;
        if(nextRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        if(nextRow.childNodes[col].mine === true) mineIndicator += 1;
        console.log(mineIndicator);
      } else if(Number(col) === boardSize[boardSize.length-1]) {
        if(previousRow.childNodes[col - 2].mine === true) mineIndicator += 1; 
        if(previousRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        if(box.previousSibling.mine === true) mineIndicator += 1;
        if(nextRow.childNodes[col - 2].mine === true) mineIndicator += 1; 
        if(nextRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        console.log(mineIndicator);
      } else {
        if(previousRow.childNodes[col - 2].mine === true) mineIndicator += 1; 
        if(previousRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        if(previousRow.childNodes[col].mine === true) mineIndicator += 1;
        if(box.previousSibling.mine === true) mineIndicator += 1;
        if(box.nextSibling.mine === true) mineIndicator += 1;
        if(nextRow.childNodes[col - 2].mine === true) mineIndicator += 1; 
        if(nextRow.childNodes[col - 1].mine === true) mineIndicator += 1;
        if(nextRow.childNodes[col].mine === true) mineIndicator += 1;
        console.log(mineIndicator);
      }
      if(mineIndicator > 0) {
        box.textContent = mineIndicator;
        box.dataset.value = mineIndicator;
      }
      box.dataset.status = 'clicked';
      mineIndicator = 0;
    }
  }

  const flag = (target) => {
    if (target.dataset.status === 'hidden') {
      target.dataset.status = 'flagged';
      document.querySelector('.mine-count').textContent--;
    } else if (target.dataset.status === 'flagged') {
      target.dataset.status = 'hidden';
      document.querySelector('.mine-count').textContent++;
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
      <InfoDiv className='info-section'>
        <Timer />
        <div>Mines Left: <span className='mine-count'>10</span></div>
      </InfoDiv>
      <div className='game-section'>
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