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
            url: 'https://instagram.fdkr5-1.fna.fbcdn.net/v/t39.30808-6/454410827_17932628687904667_6974002196843720733_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fdkr5-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=47UYxfH-L5gQ7kNvgEnqK3V&edm=ADW0ovcAAAAA&ccb=7-5&ig_cache_key=MzQyNzkwOTYwMjg4NzY3NzEyNQ%3D%3D.2-ccb7-5&oh=00_AYDkhuuE1FfXHtHV81oNsU27RTHEebuZ4gJoeq38atW9-A&oe=66C6D918&_nc_sid=db7772'
        },
        {
            fileType: 'image',
            url: 'https://instagram.fdkr5-1.fna.fbcdn.net/v/t39.30808-6/454002113_17932628696904667_2719168993070422871_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fdkr5-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=fBczSSIMvXMQ7kNvgHOBnEq&edm=ADW0ovcAAAAA&ccb=7-5&ig_cache_key=MzQyNzkwOTYwMjg5NjEyODQ4OA%3D%3D.2-ccb7-5&oh=00_AYABD64LQxqnK6pQXBUFp8necV8FL7Qver1xC6fUf-ijEA&oe=66C6DDE1&_nc_sid=db7772'
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



