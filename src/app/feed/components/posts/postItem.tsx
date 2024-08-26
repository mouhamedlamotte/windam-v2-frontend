'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Bookmark, Ellipsis, Heart, MessageCircle, Send, Smile } from 'lucide-react'
import React, { useState } from 'react'
import PostMediaPreview, { PostMediaPreviewProps } from './postMediaPreview'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

interface postItemProps {

}


const PostItem = (post:postItemProps) => {
    const [showFullText, setShowFullText] = useState(false)

    const media : PostMediaPreviewProps[] = [
        {
            fileType: 'image',
            url: '/assets/img/1.jpg'
        },
        {
            fileType: 'image',
            url: '/assets/img/2.jpg'
        },
        {
            fileType: "video",
            url: '/assets/video/jt.mp4'
        }
    ]

    const [comment, setComment] = useState('')
  return (
    <div className='w-full min-h-[10rem]  flex flex-col gap-1 py-4'>
        <div className='flex items-center'>
            <div className='flex items-center gap-1'>
                <Avatar className='w-8 h-8'>
                    <AvatarImage src='https://github.com/mouhamedbaba.png'/>
                    <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <h4 className='text-sm font-bold ms-2'>Mouhamed</h4>
                <span className='text-xs text-muted-foreground'>&bull;</span>
                <span className='text-xs text-muted-foreground'>1 sem</span>
                <span className='text-xs text-muted-foreground'>&bull;</span>
                <Button variant="link" className='hover:no-underline text-blue-600 p-1 hover:text-foreground'>
                    Suivre
                </Button>
            </div>
            <Button size="icon" variant="ghost" className='p-2 ml-auto'>
                    <Ellipsis />
            </Button>
        </div>
            <PostMediaPreview media={media} />
        {/* ICONS */}
        <div className='flex items-center'>
            <div className='flex gap-1 items-center'>
            <Button size="icon" className='ml-auto p-0 px-0 hover:bg-transparent' variant="ghost" >
                        <Heart />
                </Button>              
                <Button size="icon" className='ml-auto p-0 px-0 hover:bg-transparent' variant="ghost" >
                        <MessageCircle className='-rotate-90' />
                </Button>               
                <Button size="icon" className='ml-auto p-0 px-0 hover:bg-transparent' variant="ghost" >
                        <Send />
                </Button>
            </div>
                <Button size="icon" className='ml-auto p-0 px-0 hover:bg-transparent' variant="ghost" >
                        <Bookmark />
                </Button>
        </div>
        <span className='text-xs font-bold'>143 787 J’aime</span>
        <div className='flex items-center'>
        <p className={cn('text-sm', !showFullText ? "truncate max-w-[90%]" : "")}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui magni praesentium doloremque nobis, temporibus vero commodi magnam eum dolor nihil quod adipisci incidunt sunt optio ipsam cupiditate reiciendis reprehenderit iure?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto natus repudiandae inventore ut obcaecati hic suscipit aut quae eos? Doloribus corrupti animi laudantium, rem eaque ut deserunt nam totam veniam!
        </p>
        <Button variant="link" className={cn('text-sm text-muted-foreground hover:no-underline', showFullText ? 'hidden' : 'block')} onClick={() => setShowFullText(true)}>plus</Button>
        </div>
        <div className='flex items-center gap-2'>
            <Textarea  value={comment} onChange={(e) => setComment(e.target.value)} rows={1} cols={1} className='w-full placeholder:text-muted-foreground text-sm resize-none h-0.5 scrollbar-none' placeholder='Ajouter un commentaire' />

            <Button className={cn('ml-auto hover:no-underline text-xs p-0', comment ? '' : 'hidden')} size="sm" variant="link">Commenter</Button>
            <Button size="icon" className='ml-auto p-0 px-0 hover:bg-transparent h-4 w-4' variant="ghost" >
                        <Smile />
                </Button>
        </div>
    </div>
  )
}


export default PostItem;



