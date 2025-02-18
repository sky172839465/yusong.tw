import { Globe, Moon, Search, Sun } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import LazyImage from '@/components/LazyImage'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useTheme from '@/hooks/useTheme'


const Header = () => {
  const { toggle } = useTheme()
  const [, setLanguage] = useState('en')

  return (
    <header className='sticky top-0 z-10 flex-none border-b bg-background/50 backdrop-blur-md'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        <Link
          to='/'
          className='flex items-center gap-2'
          viewTransition
        >
          <div className='rounded-md border-black bg-white p-[2px]'>
            <LazyImage
              src='/favicon.svg'
              alt='Site Logo'
              className='h-8 w-auto rounded-sm'
              width={32}
              height={32}
              isIcon
            />
          </div>
          <span className='font-bold'>
            YUSONG.TW
          </span>
        </Link>
        <div className='flex items-center space-x-4'>
          <Link
            to='/search'
            viewTransition
          >
            <Button variant='outline' size='icon'>
              <Search className='size-[1.2rem]' />
              <span className='sr-only'>
                查詢網站
              </span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Globe className='size-[1.2rem]' />
                <span className='sr-only'>
                  切換語言
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                英文
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('zh-tw')}>
                繁體中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant='outline' size='icon' onClick={toggle}>
            <Sun className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>
              切換黑暗模式
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
