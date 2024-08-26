import React from 'react'
import { Layout } from '../_layout'
import { ScrollArea } from '@/components/ui/scroll-area'
import PostItem from './components/posts/postItem'
import StoriesPreviews from './components/stories/storiesPreviews'

const Feeds = () => {
  return (
    <Layout>
        <div className='flex h-screen justify-center items-center px-20 overflow-scroll'>
            <div className="h-full w-full flex gap-6">

              
                <div className="w-4/6 flex flex-col gap-4 scrollbar-none">
                  {/* <StoriesPreviews /> */}
                  <h3 className='text-center font-bold py-4'>Stories</h3>
                <div className='divide-y divide-muted flex justify-center items-center flex-col px-52'>
                  {
                    Array.from({ length: 10 }).map((_, i) => (
                        <PostItem key={i} />
                    ))
                  }
                </div>
                </div>
                <div className="w-2/6 right-0 h-full flex justify-center items-center fixed bg-muted">
                  <h3 className='font-bold'>Suggested friends</h3>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Feeds

