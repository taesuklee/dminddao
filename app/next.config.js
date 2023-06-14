/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        FILECOIN_CALIBRATION_TESTNET: "https://api.calibration.node.glif.io/rpc/v1",
    },
}

module.exports = nextConfig
