import { usePages } from '@/hooks/usePages'

import Link from 'next/link'

export default function Home() {
    const pages = usePages()

    return (
        <div className='flex flex-col gap-10 '>
            <div className='flex flex-col w-full max-w-lg mx-auto mt-40 gap-3'>
                <h2 className='text-5xl text-violet-200'>
                    Olá, bem-vindo ao GHub
                </h2>

                <h3 className='text-lg ml-2 text-violet-400'>
                    Encontre usuários ou repositórios do GitHub
                </h3>
            </div>

            <div className='h-0 border-b max-w-lg w-full border-emerald-400 mx-auto'></div>

            <h3 className='mx-auto text-xl'>O que deseja pesquisar?</h3>

            <div className='flex flex-row gap-5 max-w-lg mx-auto my-auto'>
                {pages.map((page) => (
                    <Link
                        key={page.path}
                        href={page.path}
                        data-testid={page.label}
                        className='
                          w-48 h-48 rounded-md
                          border-2 border-emerald-400
                          hover:bg-emerald-400 group
                          flex items-center justify-center
                        '
                    >
                        <p className='text-3xl text-emerald-400 group-hover:text-slate-900'>
                            {page.label}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
