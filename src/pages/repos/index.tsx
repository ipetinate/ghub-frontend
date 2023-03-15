import { useQuery } from '@tanstack/react-query'
import { useSearchStore } from '@/store/useSearchStore'

import { getRepoHandler } from '@/api/queries/repo'

import { Spinner } from 'flowbite-react'

import { useMemo } from 'react'
import { RepoCard } from '@/components/RepoCard'

export default function Users() {
    const { term } = useSearchStore()

    const queries = useMemo(() => (term ? `q=${term}` : ''), [term])

    const { data, isLoading, isFetching } = useQuery(
        ['search/repositories', queries],
        getRepoHandler
    )

    if (isLoading || isFetching) {
        return (
            <div className='h-[calc(100vh_-_10rem)] w-screen flex items-center justify-center p-10'>
                <Spinner color='purple' size='xl' className='m-auto' />
            </div>
        )
    }

    if (!data || data?.items?.length <= 0) {
        return (
            <div className='h-[calc(100vh_-_10rem)] w-screen flex items-center justify-center p-10'>
                <p className='text-center m-auto'>
                    Nenhum repositório encontrado
                </p>
            </div>
        )
    }

    return (
        <div className='flex flex-row flex-wrap gap-3 justify-center p-3 h-full w-full overflow-y-auto'>
            {data?.items?.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
        </div>
    )
}
