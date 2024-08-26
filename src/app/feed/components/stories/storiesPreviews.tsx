import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React from 'react'
import StoryItem from './storyItem'

const StoriesPreviews = () => {
  return (
    <ScrollArea className='w-full h-[30px]'>
              <div className="flex w-max space-x-4 p-4 pe-10 scrollbar-none">
        {Array.from({ length: 40 }).map((_, i) => (
            <StoryItem key={i}/>
        ))}
        </div>
    <ScrollBar orientation='horizontal' />
  </ScrollArea>
  )
}

export default StoriesPreviews