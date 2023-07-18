import styled from 'styled-components';

const Box = styled.td`
  width: 25px;
  height: 25px;
  text-align: center;
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
`

export {
  Box,
}