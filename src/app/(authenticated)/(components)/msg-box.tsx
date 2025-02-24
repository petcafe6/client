"use client"

import { useEffect, useState } from 'react'
import { getItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { SendHorizontalIcon, SmileIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  text?: string
  onSend?: (e: string) => void
}
export function MsgBox({ text = "", onSend }: Props) {
  const [msg, setMsg] = useState(text)
  // const [token, setToken] = useState('')
  // const { toast } = useToast()
  // const [loading, setLoading] = useState(false)


  // useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  // useEffect(() => { token && load() }, [token])

  return (<>
    <div className='relative w-full h-full'>
      <Textarea
        id='txtMsg'
        value={msg}
        className='pe-14'
        placeholder={`type here...`}
        onChange={e => {
          setMsg(e.target.value)
        }}
      />

      <div className='absolute right-0 top-0 flex flex-col'>
        <Button variant={'ghost'} >
          <SmileIcon />
        </Button>
        <Button variant={'ghost'} onClick={() => {
          if (onSend && (msg || '').trim() != '') {
            onSend((msg || '').trim())
            setMsg('')
          }
        }}>
          <SendHorizontalIcon />
        </Button>
      </div>

    </div>
  </>)
}