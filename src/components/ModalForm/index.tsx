import React from 'react'
import { useForm } from 'react-hook-form'
import { Block, useBlocks } from '../../contexts/BlocksContext'
import { ModalFormWrapper, Form } from './styles'

type ModalFormProps = {
  blockCoordinates: Block
  saveBlock: () => void
}

const ModalForm: React.FC<ModalFormProps> = ({
  blockCoordinates,
  saveBlock
}) => {
  const { register, handleSubmit } = useForm()
  const [blocks, setBlocks] = useBlocks()

  const saveNewBlock = (data: Block) => {
    setBlocks([...blocks, data])
    saveBlock()
  }

  return (
    <ModalFormWrapper>
      <Form onSubmit={handleSubmit(saveNewBlock)}>
        <label htmlFor="id">
          ID
          <input id="id" {...register('id')} type="text" />
        </label>
        <label htmlFor="x">
          X
          <input
            id="x"
            {...register('x', { valueAsNumber: true })}
            readOnly
            value={blockCoordinates.x}
            type="number"
          />
        </label>
        <label htmlFor="y">
          Y
          <input
            id="y"
            {...register('y', { valueAsNumber: true })}
            readOnly
            value={blockCoordinates.y}
            type="number"
          />
        </label>
        <label htmlFor="width">
          Width
          <input
            id="width"
            {...register('width', { valueAsNumber: true })}
            readOnly
            value={blockCoordinates.width}
            type="number"
          />
        </label>
        <label htmlFor="height">
          Height
          <input
            id="height"
            {...register('height', { valueAsNumber: true })}
            readOnly
            value={blockCoordinates.height}
            type="number"
          />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </ModalFormWrapper>
  )
}

export default ModalForm
