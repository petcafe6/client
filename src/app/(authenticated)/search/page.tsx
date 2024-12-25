"use client"

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'


export default function Home() {
  const [report, setReport] = useState('')
  return (
    <div className='flex flex-col gap-4'>
      <h2>search</h2>
    </div>
  )
}
