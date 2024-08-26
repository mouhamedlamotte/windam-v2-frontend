"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import {  ChevronLeftCircle, ChevronRightCircle, Volume, VolumeX } from 'lucide-react';




export type PostMediaPreviewProps = {
    fileType: "image" | "video",
    url : string    
}


const ImagePreview = ({url}:{url:string}) =>{
    return (
        <img alt="image" src={url} className="w-full h-full object-cover" />
    )
}

const VideoPreview = ({url}:{url:string}) =>{
    const [playing, setPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isMuted, setIsMuted] = useState(true);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    videoRef.current?.play();
                } else {
                    setIsInView(false);
                    videoRef.current?.pause();
                }
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        if (videoRef.current) {
            if (playing) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [playing]);
    return (
        <div className='w-full h-full relative'>
            <video 
                
                ref={videoRef}
                onClick={() => setPlaying(!playing)}
                loop 
                playsInline
                src={url} 
                className="w-full h-full object-center" 
            />
            
            <Button 
                onClick={toggleMute}
                className="absolute bottom-4 right-4 p-2  bg-slate-900/50 hover:bg-slate-900/50 "
            >
                {isMuted ? <VolumeX size={14}/> : <Volume size={14}/>}
            </Button>
        </div>
    )
}

const PostMediaPreview = ({media}:{media:PostMediaPreviewProps[]}) => {
  return (
    <div className='border rounded-md max-h-[45rem] overflow-hidden relative'>
        <Swiper 
        pagination={true} 
        modules={[Pagination]} 
        className="mySwiper h-full">
        {
            media.map((media,i) => (
                <SwiperSlide key={i}>
                {
                    media.fileType === "image" ? <ImagePreview  url={media.url} /> : <VideoPreview url={media.url} />
                }
                </SwiperSlide>
            ))
        }
        <SlideButtons/>
        </Swiper>
    </div>
  )
}

function SlideButtons() {
    const swiper = useSwiper();
    return (
        <div className='w-full flex inset-0 pointer-events-none z-20 absolute justify-between items-center px-2'>
                    <Button  title='Previous'  className='pointer-events-auto hover:bg-transparent ' size="icon" variant="ghost"
                    onClick={() => swiper.slidePrev()}
                    >
                        <ChevronLeftCircle className='stroke-muted-foreground' />
                    </Button>
                    <Button title='Next' className='pointer-events-auto hover:bg-transparent ' size="icon" variant="ghost"
                    onClick={() => swiper.slideNext()}
                    >
                        <ChevronRightCircle className='stroke-muted-foreground' />
                    </Button>
                </div>
            
    )
}
export default PostMediaPreview