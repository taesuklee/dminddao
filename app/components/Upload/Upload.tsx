'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import { createNFT } from '@/utils/wallet/nftTrader'

import { createHelia } from 'helia'
import type { Libp2p } from '@libp2p/interface-libp2p'
import type { PubSub } from '@libp2p/interface-pubsub'
import type { DualKadDHT } from '@libp2p/kad-dht'
import type { Helia } from '@helia/interface'
import { UnixFS, unixfs } from '@helia/unixfs'
import { createNode, uploadData } from '@/utils/ipfs/ipfs'
import { MemoryBlockstore } from 'blockstore-core'

const Upload = () => {
  const [fileUrl, setFileUrl] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    const init = async () => {
      await createNode()
    }

    init()
  }, [fileUrl])

  const onDrop = useCallback(
    async (acceptedFile: any[]) => {
      console.log('AF', acceptedFile)

      const url = await uploadData(acceptedFile[0])
      setFileUrl(url)
    },
    [fileUrl]
  )

  //TODO: accept only specific audio file. https://react-dropzone.js.org/#section-accepting-specific-file-types
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: { file: ['image/*'] },
    // maxSize: 10000,
  })

  return (
    <div>
      <div {...getRootProps()}>
        <button>
          <FiUpload />
          <input {...getInputProps()} />
        </button>
      </div>
      {fileUrl && (
        <div>
          <div>
            <label>NFT name: </label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Description: </label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Price: </label>
            <input type="string" onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
      )}

      <button onClick={() => createNFT(name, price, description, fileUrl)}>
        Upload NFT
      </button>
    </div>
  )
}

export default Upload
