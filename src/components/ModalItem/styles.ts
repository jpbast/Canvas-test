import styled from 'styled-components'
import { Block } from '../../contexts/BlocksContext'

const ModalItemWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1200px;
  background-color: rgb(6, 9, 43, 0.3);
`

export const ModalItemContent = styled.div<{ block: Block }>`
  /* background-color: rgb(240, 240, 240); */
  padding: 10px;
  width: 200px;
  display: ${(props) => (props.block ? 'block' : 'none')};
`

export default ModalItemWrapper
