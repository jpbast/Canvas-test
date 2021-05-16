import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const CanvasWrapper = styled.canvas`
  background-color: yellow;
`

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    const context = canvas.getContext('2d')
    contextRef.current = context
    contextRef.current.scale(2, 2)
    contextRef.current.lineCap = 'round'
    contextRef.current.lineWidth = 5
    contextRef.current.strokeStyle = 'black'
  }, [])

  function startDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    setIsDrawing(true)

    const { clientX, clientY } = e
    contextRef.current.beginPath()
    contextRef.current.moveTo(clientX, clientY)
  }

  function finishDrawing() {
    setIsDrawing(false)
    contextRef.current.closePath()
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing) return

    const { clientX, clientY } = e
    console.log(clientX, clientY)
    contextRef.current.lineTo(clientX, clientY)
    contextRef.current.stroke()
  }

  return (
    <CanvasWrapper
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  )
}

export default Canvas
