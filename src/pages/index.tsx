import { useState } from 'react'
import CanvasFreeDrawing from '../components/CanvasFreeDrawing'
import CanvasTest, { Block } from '../components/CanvasTest'
import Modal from '../components/Modal'

export default function Home() {
  const [selectedBlock, setSelectedBlock] = useState<Block>(null)

  return (
    <>
      <div style={selectedBlock ? { opacity: '0.4' } : null}>
        <CanvasTest setSelectedBlock={setSelectedBlock} />
        <CanvasTest setSelectedBlock={setSelectedBlock} />
      </div>
      <Modal onClose={() => setSelectedBlock(null)} block={selectedBlock} />
    </>
  )
}
