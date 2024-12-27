import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LinkIcon, Share2Icon } from 'lucide-react'
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TelegramShareButton,
  TelegramIcon,
  PinterestShareButton,
  PinterestIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from 'next-share'
import { useToast } from './ui/use-toast'

interface Props {
  className?: string
  url?: string
  content?: string
  hashtag?: string
}

// https://next-share.js.org/

export function ButtonShare({
  className = "",
  hashtag = "#petcafe",
  content = "PetCafe is a social platform for pet owners.",
  url = ""
}: Props) {
  const link = url?.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_BASE_URL}${url}`
  const { toast } = useToast()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Share2Icon />
      </PopoverTrigger>
      <PopoverContent className={`w-full max-h-[500px] overflow-y-scroll ${className}`}>
        <h3>Share</h3>
        <div className='grid grid-cols-8 gap-4'>
          <WhatsappShareButton url={link} title={content} separator=":: ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TwitterShareButton url={link} title={content}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <FacebookShareButton url={link} quote={content} hashtag={hashtag}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <FacebookMessengerShareButton url={link} appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ''}>
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>

          <TelegramShareButton url={link} title={content}          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>

          <PinterestShareButton url={link} media={content}>
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <LinkedinShareButton url={link}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <RedditShareButton url={link} title={content}>
            <RedditIcon size={32} round />
          </RedditShareButton>

          <EmailShareButton url={link} subject={'PetCafe'} body={content}>
            <EmailIcon size={32} round />
          </EmailShareButton>
          <div
            className='cursor-pointer bg-blue-500 rounded-full p-2'
            onClick={() => {
              navigator.clipboard.writeText(link)
              toast({ description: 'Link copied', duration: 1200 })
            }}
          >
            <LinkIcon size={16} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
