import lighthouse from "@lighthouse-web3/sdk"
import { createHelia } from "helia"
import { noise } from "@chainsafe/libp2p-noise"
import { yamux } from "@chainsafe/libp2p-yamux"
import { bootstrap } from "@libp2p/bootstrap"
import { MemoryBlockstore } from "blockstore-core"
import { MemoryDatastore } from "datastore-core"
import { createLibp2p } from "libp2p"
import { identifyService } from "libp2p/identify"
import { UnixFS, unixfs } from "@helia/unixfs"
import { create as ipfsHttpClient } from "ipfs-http-client"

let helia
let fs: UnixFS

export async function createNode() {
    const blockstore = new MemoryBlockstore()
    const datastore = new MemoryDatastore()

    helia = await createHelia({ blockstore, datastore })
    fs = unixfs(helia)
}

export const uploadData = async (file: FileList | null) => {
    const output = await lighthouse.upload(
        file,
        process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!,
        (progress) => console.log(100 - progress?.total / progress?.uploaded)
    )

    console.log(
        "Upload status: ",
        output,
        "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    )
}
