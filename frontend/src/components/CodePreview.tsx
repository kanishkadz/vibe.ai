import React from 'react'

const CodePreview = () => {
  return (
    <div className='flex-1 rounded-xl overflow-hidden border-gray-700'>
        <div className='flex items-center gap-2 px-4 py-2 bg-[#1a1a1a1a] border-b border-gray-700'>
            <span className='text-[#ff3e9a]'>Code</span>
            <span className='text-gray-400'>Preview</span>
        </div>
        <div className='grid grid-cols-2 h-[600px]'>
            <div className='border-r border-gray-700 bg-[#1a1a1a1a]'>
                <div className='bg-[#1a1a1a1a]'></div>
            </div>
        </div>
    </div>
  )
}

export default CodePreview