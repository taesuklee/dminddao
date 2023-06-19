import lighthouse from "@lighthouse-web3/sdk"
import { createHelia } from "helia"
import { MemoryBlockstore } from "blockstore-core"
import { MemoryDatastore } from "datastore-core"
import { UnixFS, unixfs } from "@helia/unixfs"

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
