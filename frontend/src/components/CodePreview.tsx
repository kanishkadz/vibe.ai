import React, { useState } from 'react';

const CodePreview = () => {
  const [activeTab, setActiveTab] = useState('code');

  return (
    <div className='flex-1 rounded-xl overflow-hidden border border-gray-700'>
      <div className='flex items-center gap-4 px-4 py-2 bg-[1e1e1e] border-b border-gray-700'>
        <button onClick={() => setActiveTab('code')} className={`text-sm font-medium ${activeTab === 'code' ? 'text-[#ff3e9a]' : 'text-gray-400'}`}>
          Code
        </button>
        <button onClick={() => setActiveTab('preview')} className={`text-sm font-medium ${activeTab === 'preview' ? 'text-[#ff3e9a]' : 'text-gray-400'}`}>
          Preview
        </button>
      </div>

      {/* Content Area */}
      <div className='h-[600px] bg-[#1e1e1e] p-4 text-white'>
        {activeTab === 'code' ? (
          <div className='h-full border border-dashed border-gray-600 rounded p-4'>
            {/* Replace this with actual code editor later */}
            <p>// Write your code here...</p>
          </div>
        ) : (
          <div className='h-full border border-dashed border-gray-600 rounded p-4'>
            {/* Replace this with live preview logic */}
            <p>This is the preview of what you wrote.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
