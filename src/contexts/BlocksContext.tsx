import React, { createContext, useContext, useState } from 'react'

export type Block = {
  id?: string
  x: number
  y: number
  width: number
  height: number
  hover?: boolean
}

type BlocksContextType = [
  blocks: Block[],
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
]

export const BlocksContext = createContext<BlocksContextType>(null)

export const BlocksProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [blocks, setBlocks] = useState([] as Block[])
  return (
    <BlocksContext.Provider value={[blocks, setBlocks]}>
      {children}
    </BlocksContext.Provider>
  )
}

export const useBlocks = () => useContext(BlocksContext)
