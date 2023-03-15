import { useCallback, ChangeEvent } from 'react'

import { usePages } from '@/hooks/usePages'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchStore } from '@/store/useSearchStore'

import Link from 'next/link'
import Image from 'next/image'

import logo from '@/assets/github.png'

export function Navbar() {
    const pages = usePages()

    const { setTerm } = useSearchStore()

    const [executeSearch] = useDebounce<any, void>(800, setTerm)

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            executeSearch(event.target.value)
        },
        [executeSearch]
    )

    return (
        <div className='flex flex-row h-40 justify-between border-b border-violet-400'>
            <div className='flex flex-row h-40 w-1/2 p-3'>
                <Link href={'/'} className='flex flex-row gap-5 w-full'>
                    <Image
                        src={logo}
                        alt='Github logo'
                        height={128}
                        width={128}
                    />

                    <div className='h-32 flex items-center'>
                        <h1 className='text-8xl text-violet-500'>GHub</h1>
                    </div>
                </Link>
            </div>

            <div className='flex items-center h-40 w-1/2 p-3'>
                <div className='p-2 flex flex-col gap-3 max-w-lg w-full mx-auto'>
                    <div className='flex flex-row gap-4'>
                        {pages.map((page) => (
                            <Link
                                key={page.path}
                                href={page.path}
                                className={`font-semibold ${
                                    page.active
                                        ? 'text-violet-300'
                                        : 'text-cyan-300'
                                }`}
                            >
                                {page.label}
                            </Link>
                        ))}
                    </div>

                    <div className='h-0 border-b border-emerald-300' />

                    <input
                        type='text'
                        id='username'
                        name='username'
                        autoComplete='off'
                        autoCorrect='off'
                        onChange={handleChange}
                        placeholder='Pesquisar'
                        className='w-full h-10 rounded-md px-3 bg-slate-900 border border-violet-300'
                    />
                </div>
            </div>
        </div>
    )
}
