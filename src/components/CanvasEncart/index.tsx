import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Block, useBlocks } from '../../contexts/BlocksContext'
import ModalItem from '../ModalItem'
import CanvasEncartWrapper from './styles'

const CanvasTest: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const blocks = useBlocks()[0]
  const [selectedBlock, setSelectedBlock] = useState<Block>(null)

  useEffect(() => {
    // if (!canvasRef) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = imgRef.current.width
    canvas.height = imgRef.current.height

    ctx.lineWidth = 5
    ctx.strokeStyle = 'blue'
    ctx.fillStyle = 'rgb(180, 180, 180, 0.5)'
    ctxRef.current = ctx
  }, [])

  const drawRect = () => {
    const ctx = ctxRef.current
    ctx.stroke()
    ctx.fill()
  }

  const handleMouseEvent = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // console.log(e.clientX, e.clientY)
    const ctx = ctxRef.current
    const canvas = canvasRef.current
    const { x, y } = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const block of blocks) {
      ctx.beginPath()
      ctx.moveTo(block.x, block.y)
      ctx.rect(block.x, block.y, block.width, block.height)
      block.hover = ctx.isPointInPath(e.clientX - x, e.clientY - y)
      if (block.hover) {
        drawRect()
        canvas.style.cursor = 'pointer'
        if (e.type == 'click') setSelectedBlock(block)
        break
      } else canvas.style.cursor = 'default'
    }
  }

  return (
    <CanvasEncartWrapper>
      <Link href="/admin">Admin</Link>
      <section>
        <img ref={imgRef} width={800} src="/bahamas.png" alt="Bahamas" />
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseEvent}
          onClick={handleMouseEvent}
        />
      </section>
      {selectedBlock && (
        <ModalItem
          onClose={() => setSelectedBlock(null)}
          block={selectedBlock}
        />
      )}
    </CanvasEncartWrapper>
  )
}

export default CanvasTest
