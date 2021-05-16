import { useEffect, useRef } from 'react'
import { Block } from './CanvasTest'

import styled from 'styled-components'

const ModalWrapper = styled.div<{ block: Block }>`
  background-color: rgb(240, 240, 240);
  padding: 10px;
  width: 200px;
  display: ${(props) => (props.block ? 'block' : 'none')};
`

const Modal: React.FC<{ block: Block; onClose: () => void }> = ({
  block,
  onClose
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!canvasRef) return
    if (!block) return

    const img = new Image()
    img.src = '/img.jpeg'
    img.onload = cropImg
    function cropImg() {
      const canvasImg = document.createElement('canvas')
      const ctxImg = canvasImg.getContext('2d')
      canvasImg.width = img.width
      canvasImg.height = img.height
      ctxImg.drawImage(this, 0, 0)

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      canvas.width = block.x[1]
      canvas.height = block.y[1]

      const imgData = ctxImg.getImageData(
        block.x[0],
        block.y[0],
        block.x[1],
        block.y[1]
      )

      ctx.putImageData(imgData, 0, 0)
    }
  }, [block])

  return (
    <ModalWrapper onClick={onClose} block={block}>
      <h2>Img</h2>
      <canvas ref={canvasRef} />
    </ModalWrapper>
  )
}

export default Modal
