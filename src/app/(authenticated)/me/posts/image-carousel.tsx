"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
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
      <Carousel className="w-full ma11x-w-xs"
        opts={{

        }}

      >
        <CarouselContent className='deneme' >
          {/* {Array.from({ length: 5 }).map((_, index) => ( */}
          {images.map((e, index) => (
            <CarouselItem key={`carousel-${index}`} className='p-0'>
              {/* <div className="p-1"> */}
              <Image
                src={s3ImageUrl(e, 800)}
                width={800}
                height={800}
                className='aspect-square object-cover'
                alt='post-image'
              />
              {/* </div> */}
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
