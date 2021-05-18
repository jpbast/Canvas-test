import styled from 'styled-components'

const CanvasAdminWrapper = styled.div`
  padding: 50px;

  a {
    margin-bottom: 20px;
    display: block;
  }

  section {
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
`

export default CanvasAdminWrapper
