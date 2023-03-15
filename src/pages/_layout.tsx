import { PropsWithChildren } from 'react'

import { Navbar } from '@/components/Navbar'

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className='h-full w-full flex flex-col'>
            <div className='h-40  w-full sticky top-0 z-50 bg-slate-900'>
                <Navbar />
            </div>

            <div className='min-h-[calc(100vh_-_10rem)] w-full overflow-y-auto'>
                {children}
            </div>
        </div>
    )
}
