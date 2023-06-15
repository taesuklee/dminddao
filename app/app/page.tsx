"use client"

import { useAppSelector } from "@/store/hooks"
import { MarketItem } from "@/utils/types"
import { buyNFT, fetchNFTs } from "@/utils/wallet/nftTrader"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
    const [nfts, setNFTs] = useState<MarketItem[] | null>(null)
    const router = useRouter()

    const userName = useAppSelector((state) => state.authReducer.userName)
    const walletAddress = useAppSelector((state) => state.marketplaceReducer.address)

    useEffect(() => {
        if (walletAddress) {
            fetchNFTs(walletAddress).then((items) => {
                console.log("ALL", items)
                if (items) setNFTs(items)
            })
        }
    }, [walletAddress])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1>{userName}</h1>
                <h1>{walletAddress}</h1>
                <img
                    src="https://ipfs.io/ipfs/QmaixP2WsemGyWuYydsNSdDumgzR71cv2Vj6CdcgA4Q3KM/outputs/image0.png"
                    alt="TEST"
                />
                <audio controls>
                    <source
                        src="https://gateway.lighthouse.storage/ipfs/QmcymghTvGLNRvVkBMeTDbtP45Zqs3zvmhbMHPpPopwAUz"
                        type="audio/mp3"
                    />
                </audio>
                <button
                    onClick={async () => await axios("http://localhost:9000/bacalhau/?prompt=test")}
                >
                    Trigger
                </button>
                {nfts &&
                    nfts.map((nft, i) => (
                        <div key={i}>
                            <label>Owner:</label>
                            <h1>{nft.owner}</h1>
                            <label>Seller:</label>
                            <h1>{nft.seller}</h1>
                            <button
                                onClick={async () => {
                                    await buyNFT(nft)
                                    router.push("/myaccount")
                                }}
                            >
                                Buy
                            </button>
                        </div>
                    ))}
            </div>
        </main>
    )
}
