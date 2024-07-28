import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='h-screen flex items-center justify-center flex-col gap-4'>
      <h1 className='text-5xl font-bold'>Not Found</h1>
      <p className='text-2xl'>You just hit a route that doesn&#39;t exist...</p>
      <Button >
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}

export default NotFound