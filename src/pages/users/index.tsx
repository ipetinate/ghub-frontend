import { useQuery } from '@tanstack/react-query'
import { useSearchStore } from '@/store/useSearchStore'

import { getUserHandler } from '@/api/queries/user'

import { Spinner } from 'flowbite-react'

import { UserCard } from '@/components/UserCard'

export default function Users() {
    const { term } = useSearchStore()

    const { data, isLoading, isFetching } = useQuery(
        ['users', term],
        getUserHandler
    )

    if (isLoading || isFetching) {
        return (
            <div className='h-[calc(100vh_-_10rem)] w-screen flex items-center justify-center p-10'>
                <Spinner color='purple' size='xl' className='m-auto' />
            </div>
        )
    }

    if (!data) {
        return (
            <div className='h-[calc(100vh_-_10rem)] w-screen flex items-center justify-center p-10'>
                <p className='text-center m-auto p-10'>
                    Nenhum usuário encontrado
                </p>
            </div>
        )
    }

    return (
        <div className='h-[calc(100vh_-_10rem)] w-screen flex items-center justify-center p-10'>
            <UserCard user={data} />
        </div>
    )
}
