import React from 'react'
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer'
import Upload from '@/components/Upload/Upload'

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      my account page
      <div>
        <AudioPlayer />
        <Upload />
      </div>
    </div>
  )
}

export default page
