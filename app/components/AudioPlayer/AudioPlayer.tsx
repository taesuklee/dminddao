'use client'
import React, { useState } from 'react'
import { TbPlayerPlay, TbPlayerPause } from 'react-icons/tb'

const AudioPlayer = () => {
  const [play, setPlay] = useState(false)

  return (
    <div>
      <button onClick={() => setPlay(!play)}>
        {play ? <TbPlayerPause /> : <TbPlayerPlay />}
      </button>
    </div>
  )
}

export default AudioPlayer
