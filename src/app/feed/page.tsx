import React from 'react'
import { Layout } from '../_layout'
import PostItem from './components/posts/postItem'
import StoriesPreviews from './components/stories/storiesPreviews'


const Feeds = () => {
  return (
    <Layout>
        <div className='flex h-screen justify-center items-center  lg:px-20 overflow-y-scroll overflow-x-hidden'>
            <div className="h-full w-full flex gap-6 justify-center lg:justify-start md:px-6">

              
                <div className="lg:w-4/6 max-w-full sm:max-w-md lg:max-w-none flex flex-col gap-4">
                  <StoriesPreviews />
                  {/* <h3 className='text-center font-bold py-4'>Stories</h3> */}
                <div className='divide-y divide-muted flex justify-center items-center flex-col lg:px-32 xl:px-40 2xl:px-52 px-6'>
                  {
                    Array.from({ length: 10 }).map((_, i) => (
                        <PostItem key={i} />
                    ))
                  }
                  <div className='mb-20 sm:hidden'></div>
                </div>
                </div>
                <div className="w-2/6 right-0 h-full lg:flex justify-center items-center fixed bg-muted hidden ">
                  <h3 className='font-bold'>Suggested friends</h3>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Feeds

