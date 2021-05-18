import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Block } from '../../contexts/BlocksContext'
import ModalForm from '../ModalForm'
import CanvasAdminWrapper from './styles'

const CanvasAdmin: React.FC = () => {
  const [shouldDraw, setShouldDraw] = useState<boolean>(false)
  const [initialRectPos, setInitialRectPos] = useState<number[]>(null)
  const [shouldSaveBlock, setShouldSaveBlock] = useState<boolean>(false)
  const [blockCoordinates, setBlockCoordinates] = useState<Block>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = imgRef.current.width
    canvas.height = imgRef.current.height

    contextRef.current = canvas.getContext('2d')
    contextRef.current.strokeStyle = 'black'
    contextRef.current.lineWidth = 5
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!shouldDraw || !canvasRef) return

    const rectX = initialRectPos[0]
    const rectY = initialRectPos[1]

    const canvas = canvasRef.current
    const ctx = contextRef.current

    const { x, y } = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const width = Math.abs(rectX - e.clientX + x)
    const height = Math.abs(rectY - e.clientY + y)
    setBlockCoordinates({ x: rectX, y: rectY, width, height })

    ctx.beginPath()
    ctx.moveTo(rectX, rectY)
    ctx.rect(rectX, rectY, width, height)
    ctx.stroke()
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef) return

    const canvas = canvasRef.current
    canvas.style.cursor = 'pointer'

    const { x, y } = canvas.getBoundingClientRect()

    setInitialRectPos([e.clientX - x, e.clientY - y])
    setShouldDraw(true)
  }

  const handleMouseUp = () => {
    if (!canvasRef) return

    canvasRef.current.style.cursor = 'default'
    setShouldDraw(false)
    setShouldSaveBlock(true)
  }

  return (
    <CanvasAdminWrapper>
      <Link href="/">Home Page</Link>
      <section>
        <img ref={imgRef} width={800} src="/bahamas.png" alt="Bahamas" />
        <canvas
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          ref={canvasRef}
        />
      </section>
      {shouldSaveBlock && (
        <ModalForm
          blockCoordinates={blockCoordinates}
          saveBlock={() => setShouldSaveBlock(false)}
        />
      )}
    </CanvasAdminWrapper>
  )
}

export default CanvasAdmin
