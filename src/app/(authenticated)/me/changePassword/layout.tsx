import pageMeta from '@/lib/meta-info'
import { Metadata } from 'next/types'

export const metadata: Metadata = pageMeta('Settings')

export default function MeLayout({ children }: { children: any }) {
  return (<>{children}</>)
}