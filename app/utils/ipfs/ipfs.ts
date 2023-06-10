import { createHelia } from 'helia'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { bootstrap } from '@libp2p/bootstrap'
import { MemoryBlockstore } from 'blockstore-core'
import { MemoryDatastore } from 'datastore-core'
import { createLibp2p } from 'libp2p'
import { identifyService } from 'libp2p/identify'
import { UnixFS, unixfs } from '@helia/unixfs'

let helia
let fs: UnixFS

export async function createNode() {
  const blockstore = new MemoryBlockstore()
  const datastore = new MemoryDatastore()

  helia = await createHelia({ blockstore, datastore })
  fs = unixfs(helia)
}

export const uploadData = async (data: any) => {
  // we will use this TextEncoder to turn strings into Uint8Arrays
  const encoder = new TextEncoder()

  const cid = await fs.addFile(data, {
    onProgress: (evt) => {
      console.info('add event', evt.type, evt.detail)
    },
  })

  // add the bytes to your node and receive a unique content identifier
  // const cid = await fs.addBytes(encoder.encode(data), {
  //   onProgress: (evt) => {
  //     console.info('add event', evt.type, evt.detail)
  //   },
  // })

  console.log('Added file:', cid.toString())

  // this decoder will turn Uint8Arrays into strings
  // const decoder = new TextDecoder()
  // let text = ''

  for await (const chunk of fs.cat(cid, {
    onProgress: (evt) => {
      console.info('cat event', evt.type, evt.detail)
    },
  })) {
    // text += decoder.decode(chunk, {
    //   stream: true,
    // })
  }

  // console.log('Added file contents:', text)
}
