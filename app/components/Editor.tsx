'use client'

import { updateEntry } from '@/utils/api'
import { use, useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content || 'Write about your day...')
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis || {})

  const { mood, summary, subject, negative, color } = analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative + '' },
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _value)
      setAnalysis(updated.analysis)
      setIsLoading(false)
    }
  })

  if (!analysis) return null

  return (
    <div className='w-full h-full grid grid-cols-3'>
      <div className='col-span-2'>
        <div className='w-full h-full'>
          {isLoading && (<div>...loading</div>)}
          <textarea
            className='w-full h-full p-8 text-xl outline-none'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <div className='border-l border-black/10'>
        <div className='px-6 py-10' style={{ backgroundColor: color }}>
          <h2 className='text-2xl text-white'>Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className='px-2 py-4 flex items-center justify-between border-b border-black/10'
              >
                <span className='text-lg font-semibold'>{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor