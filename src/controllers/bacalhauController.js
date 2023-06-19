const { Router } = require("express")
const { extract, fetchCID, fetchJobId } = require("../helper/bacalhauHelper")
const shell = require("shelljs")

const router = Router()

router.get("/", async (req, res) => {
    try {
        const prompt = req.query.prompt || undefined
        console.log("PROMPT", prompt)
        if (prompt !== undefined) {
            // const submitSDJob = `bacalhau docker run --gpu 1 ghcr.io/bacalhau-project/examples/stable-diffusion-gpu:0.0.1 -- python main.py --o ./outputs --p "${prompt}" --n 35`
            const submitSDJob =
                "bacalhau docker run \
                --id-only \
                --gpu 1 \
                --timeout 3600 \
                --wait-timeout-secs 3600 \
                jsacex/whisper \
                -i ipfs://QmQedij4LtCECi2j4fSS5sw88gg3QSMsnm8sSg3N1ANDFi \
                -- python openai-whisper.py -p inputs/koreantest.mp4 -s translate -o outputs"
            const data = []
            let obj = new Object()

            let submitResult = shell.exec(submitSDJob)
            console.log("EXERESULT:", submitResult.stdout)
            const jobId = extract(fetchJobId, submitResult)
            console.log("JOB ID: ", jobId)
            const cid = extract(fetchCID, shell.exec(`bacalhau describe ${jobId}`).stdout)
            console.log(`CID : ${cid}`)
            const url = `https://ipfs.io/ipfs/${cid}/outputs/koreantest.vtt`

            obj.jobID = jobId
            obj.CID = cid
            obj.url = url
            data.push(obj)
            console.log("DATA:", data)
            return data
        } else {
            return "prompt undefined"
        }
    } catch (error) {
        console.log("While running bacalhau job:", error)
        res.status(500)
    }
})

module.exports = router
