"use client"

import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { s3ImageUrl } from '@/lib/utils'
import Image from 'next/image'
interface Props {
  images?: string[]
}

export function ImageCarousel({ images }: Props) {
  return (<>
    {images &&
      <Carousel className="w-full max-w-lg"
      >
        <CarouselContent className='deneme' >
          {images.map((e, index) => (
            <CarouselItem key={`carousel-${index}`} className='p-0'>
              <Image
                priority
                src={s3ImageUrl(e, 800)}
                width={800}
                height={800}
                className='aspect-square object-cover'
                alt='post-image'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-0' />
        <CarouselNext className='right-0' />
      </Carousel>
    }
  </>
  )
}
