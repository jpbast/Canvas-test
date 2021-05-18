import { useEffect, useRef } from 'react'
import { Block } from '../../contexts/BlocksContext'
import ModalItemWrapper, { ModalItemContent } from './styles'

const Modal: React.FC<{ block: Block; onClose: () => void }> = ({
  block,
  onClose
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!canvasRef || !block) return

    const img = new Image()
    img.src = '/bahamas.png'
    img.onload = cropImg

    function cropImg() {
      const canvasImg = document.createElement('canvas')
      const ctxImg = canvasImg.getContext('2d')
      canvasImg.width = img.width
      canvasImg.height = img.height
      ctxImg.drawImage(this, 0, 0)
      console.log(img.width, img.height)
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      canvas.width = (block.width * img.width) / 800
      canvas.height = (block.height * img.height) / 1023

      const imgData = ctxImg.getImageData(
        (block.x * img.width) / 800,
        (block.y * img.height) / 1023,
        (block.width * img.width) / 800,
        (block.height * img.height) / 1023
      )

      ctx.putImageData(imgData, 0, 0)
    }
  }, [block])

  // function convertValue(num: number, type: number) {
  //   return type*num
  // }

  return (
    <ModalItemWrapper>
      <ModalItemContent onClick={onClose} block={block}>
        <h2>{block.id}</h2>
        <canvas ref={canvasRef} />
      </ModalItemContent>
    </ModalItemWrapper>
  )
}

export default Modal
