import Link from 'next/link'

export type IconProps = React.HTMLAttributes<SVGElement> & { width?: number, height?: number }

export const HeaderLogo2 = ({
  className,
}: { className?: string }) => {
  return (
    <div className={`flex flex-row items-center m-0 p-0 text-2xl max-h-10 ${className}`}>
      <img className='h-6 me-1' src="/img/icon.svg" alt="logo" />
      <div className='font-semibold'>Pet</div>
      <div className='font-serif'>Café</div>
    </div>
  )
}