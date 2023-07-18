import styled from 'styled-components';

const Box = styled.td`
  width: 25px;
  height: 25px;
  text-align: center;
  font-weight: bold;
  &[data-status='hidden'] {
    background: gray;
  }
  &[data-status='clicked'] {
    background: lightgray;
  }
  &[data-mine='true'] {
    background: red;
  }
  &[data-status='flagged'] {
    background: yellow;
  }
  &[data-value='1'] {
    color: blue;
  }
  &[data-value='2'] {
    color: green;
  }
  &[data-value='3'] {
    color: red;
  }
  &[data-value='4'] {
    color: #000080;
  }
  &[data-value='5'] {
    color: #800000;
  }
`

const InfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 290px;
`

export {
  Box,
  InfoDiv
}