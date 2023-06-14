"use client"
import React, { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { FiUpload } from "react-icons/fi"
import { createNFT } from "@/utils/wallet/nftTrader"
import { createNode, uploadData } from "@/utils/ipfs/ipfs"
import { useRouter } from "next/navigation"

const Upload = () => {
    const [fileUrl, setFileUrl] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        const init = async () => {
            await createNode()
        }

        init()
    }, [fileUrl])

    const router = useRouter()

    return (
        <div>
            <div>
                {/* <button>
                    <FiUpload /> */}
                <input onChange={(e) => uploadData(e.target.files)} type="file" />
                {/* </button> */}
            </div>
            {fileUrl && (
                <div>
                    <div>
                        <label>NFT name: </label>
                        <input type="text" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Description: </label>
                        <input type="text" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label>Price: </label>
                        <input type="string" onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
            )}

            <button
                onClick={async () => {
                    if (name && price && description && fileUrl) {
                        await createNFT(name, price, description, fileUrl)
                        router.push("/")
                    }
                }}
            >
                Upload NFT
            </button>
        </div>
    )
}

export default Upload
