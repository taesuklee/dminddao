const { Router } = require("express")
const { extract, fetchCID, fetchJobId } = require("../helper/bacalhauHelper")
const shell = require("shelljs")

const router = Router()

router.get("/", async (req, res) => {
    try {
        const prompt = req.query.prompt || undefined

        console.log("PROMPT", prompt)

        if (prompt !== undefined) {
            console.log(`prompt : ${prompt}`)
            // const submitSDJob = `bacalhau docker run --gpu 1 ghcr.io/bacalhau-project/examples/stable-diffusion-gpu:0.0.1 -- python main.py --o ./outputs --p "${prompt}" --n 35`
            const submitSDJob =
                "bacalhau docker run \
                --id-only \
                --gpu 1 \
                --timeout 3600 \
                --wait-timeout-secs 3600 \
                jsacex/whisper \
                -i ipfs://bafybeielf6z4cd2nuey5arckect5bjmelhouvn5rhbjlvpvhp7erkrc4nu \
                -- python openai-whisper.py -p inputs/Apollo_11_moonwalk_montage_720p.mp4 -o outputs"
            const data = []
            var obj = new Object()

            const jobId = extract(fetchJobId, shell.exec(submitSDJob).stdout)
            const cid = extract(fetchCID, shell.exec(`bacalhau describe ${jobId}`).stdout)
            console.log(`CID : ${cid}`)
            const url = `https://ipfs.io/ipfs/${cid}/outputs/Apollo_11_moonwalk_montage_720p.vtt`

            obj.jobID = jobId
            obj.CID = cid
            obj.url = url
            data.push(obj)
            console.log(data)
            return data
        } else {
            return "prompt undefined"
        }
    } catch (error) {}
})

module.exports = router
