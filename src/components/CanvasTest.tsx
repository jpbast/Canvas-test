import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const CanvasWrapper = styled.canvas`
  background-color: yellow;
  margin-right: 50px;
`

const width = 140
const height = 100

export type Block = {
  x: number[]
  y: number[]
  hover?: boolean
}

const blocks: Block[] = [
  {
    x: [10, width],
    y: [200, height]
  },
  {
    x: [160, width],
    y: [200, height]
  },
  {
    x: [330, width],
    y: [200, height]
  }
]

type CanvasTestProps = {
  setSelectedBlock: (block: Block) => void
}

const CanvasTest: React.FC<CanvasTestProps> = ({ setSelectedBlock }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D>(null)

  useEffect(() => {
    if (!canvasRef) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.lineWidth = 5
    ctx.strokeStyle = 'blue'
    ctx.fillStyle = 'gray'
    ctxRef.current = ctx
    // ctxRef.current.beginPath()
    // ctxRef.current.moveTo(0, 0)
    // ctxRef.current.lineTo(250, 250)
    // ctxRef.current.strokeStyle = 'black'
    // ctxRef.current.stroke()
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
      ctx.moveTo(block.x[0], block.y[0])
      ctx.rect(block.x[0], block.y[0], block.x[1], block.y[1])
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
    <>
      <CanvasWrapper
        width="500px"
        height="500px"
        ref={canvasRef}
        onMouseMove={handleMouseEvent}
        onClick={handleMouseEvent}
      />
    </>
  )
}

export default CanvasTest
