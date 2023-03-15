import { UsersIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export function usePages() {
    const { pathname } = useRouter()

    const pages = useMemo(
        () => [
            {
                label: 'Usuários',
                icon: UsersIcon,
                path: '/users',
                active: pathname.includes('users')
            },
            {
                label: 'Repositórios',
                icon: ArchiveBoxIcon,
                path: '/repos',
                active: pathname.includes('repos')
            }
        ],
        [pathname]
    )

    return pages
}
