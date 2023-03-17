import { getUserHandler } from '@/api/queries/user'
import { GitHubRepository } from '@/types/github'
import { Popover } from '@headlessui/react'
import {
    ArchiveBoxIcon,
    ChevronRightIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Tooltip } from 'flowbite-react'
import { useCallback, useState } from 'react'
import { usePopper } from 'react-popper'

type RepoCardProps = {
    repo: GitHubRepository
}

export function RepoCard({ repo }: RepoCardProps) {
    const { data: user } = useQuery(['users', repo.owner.login], getUserHandler)

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()

    let { styles, attributes } = usePopper(referenceElement, popperElement)

    const handleOpenRepoPage = useCallback(() => {
        if (!window) return

        window?.open(repo.html_url, '_blank')
    }, [repo.html_url])

    return (
        <div className='w-80 h-80 border rounded flex flex-col justify-between overflow-hidden'>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row items-center gap-3 p-3'>
                    <ArchiveBoxIcon
                        className='w-10 h-10'
                        data-testid='repo-card-icon'
                    />

                    <div className='w-full overflow-hidden'>
                        <h2 className='text-xl'>{repo.name}</h2>

                        <Tooltip content={repo.description}>
                            <p className='text-sm truncate text-ellipsis overflow-hidden w-48'>
                                {repo.description ?? 'Sem descrição'}
                            </p>
                        </Tooltip>
                    </div>
                </div>

                <div className='h-full flex items-center px-2'>
                    <button
                        onClick={handleOpenRepoPage}
                        aria-label='Open repository page on GitHub in a new page'
                    >
                        <ChevronRightIcon className='w-8 h-8' />
                    </button>
                </div>
            </div>

            <div className='h-0 border-b w-full' />

            <div className='p-3'>
                <p className='text-sm'>
                    Criado em:{' '}
                    <span className='text-xs text-emerald-300'>
                        {new Date(repo.created_at).toLocaleDateString('pt-BR')}
                    </span>
                </p>

                <p className='text-sm'>
                    Licença:{' '}
                    <span className='text-xs text-emerald-300'>
                        {repo?.license?.name ?? 'Não declarado'}
                    </span>
                </p>
            </div>

            <div className='h-0 border-b w-full' />

            <div className='flex flex-col gap-1 p-3'>
                <div className='flex flex-row gap-2'>
                    <p className='text-sm'>
                        Forks:{' '}
                        <span className='text-xs text-emerald-300'>
                            {repo.forks_count ?? 'Não declarado'}
                        </span>
                    </p>

                    <p className='text-sm'>
                        Stars:{' '}
                        <span className='text-xs text-emerald-300'>
                            {repo.stargazers_count ?? 'Não declarado'}
                        </span>
                    </p>

                    <p className='text-sm'>
                        Watchers:{' '}
                        <span className='text-xs text-emerald-300'>
                            {repo.watchers_count ?? 'Não declarado'}
                        </span>
                    </p>
                </div>

                <div>
                    <label htmlFor='clone_url' className='text-sm'>
                        URL para clonar
                    </label>
                    <input
                        readOnly
                        type='text'
                        id='clone_url'
                        name='clone_url'
                        value={repo.clone_url}
                        className='bg-transparent border-emerald-500 h-5 text-xs w-full rounded'
                    />
                </div>
            </div>

            {user ? (
                <div className='w-full'>
                    <div className='h-0 border-b w-full' />

                    <div className='px-3 py-2 flex flex-row justify-between items-center'>
                        <Avatar
                            img={user?.avatar_url ?? ''}
                            placeholderInitials={user?.name?.charAt(0)}
                        >
                            <div className=' font-medium dark:text-white'>
                                <div>{user?.name}</div>

                                <div className='text-sm text-gray-500 dark:text-gray-400'>
                                    {user?.login}
                                </div>
                            </div>
                        </Avatar>

                        <Popover>
                            {({ open }) => (
                                /* Use the `open` state to conditionally change the direction of the chevron icon. */
                                <>
                                    <Popover.Button
                                        name='open-user-info'
                                        aria-label='Show user info'
                                        ref={setReferenceElement as any}
                                    >
                                        <InformationCircleIcon className='w-6 h-6 text-emerald-500' />
                                    </Popover.Button>

                                    <Popover.Panel
                                        ref={setPopperElement as any}
                                        style={styles.popper}
                                        {...attributes.popper}
                                        className='z-50'
                                    >
                                        <div className='bg-white w-60 p-2 rounded-md flex flex-col justify-start items-start gap-2 z-50'>
                                            <Avatar
                                                img={user?.avatar_url ?? ''}
                                                placeholderInitials={user?.name?.charAt(
                                                    0
                                                )}
                                            >
                                                <div className=' font-medium text-slate-900'>
                                                    <div className='text-sm'>
                                                        {user?.name}
                                                    </div>

                                                    <div className='text-xs text-gray-400'>
                                                        {user?.login}
                                                    </div>
                                                </div>
                                            </Avatar>

                                            <div className='h-0 border-b w-full' />

                                            {user?.bio ? (
                                                <div className='text-slate-500 text-xs'>
                                                    ℹ️ {user?.bio}
                                                </div>
                                            ) : null}

                                            {user?.company ? (
                                                <div className='text-violet-900 text-sm'>
                                                    👨🏻‍💻 {user?.company}
                                                </div>
                                            ) : null}

                                            {user?.email ? (
                                                <div className='text-violet-900 text-sm'>
                                                    📧 {user?.email}
                                                </div>
                                            ) : null}

                                            {user?.followers ? (
                                                <div className='text-violet-900 text-sm'>
                                                    🔁 Seguidores:{' '}
                                                    <span className='text-xs text-emerald-500'>
                                                        {user.followers}
                                                    </span>
                                                </div>
                                            ) : null}

                                            {user?.following ? (
                                                <div className='text-violet-900 text-sm'>
                                                    🚶 Seguindo:{' '}
                                                    <span className='text-xs text-emerald-500'>
                                                        {user.following}
                                                    </span>
                                                </div>
                                            ) : null}

                                            <a
                                                href={user?.html_url ?? ''}
                                                target='_blank'
                                                className='h-5 w-full text-center bg-violet-300 text-sm rounded text-slate-900'
                                            >
                                                Ver perfil
                                            </a>
                                        </div>
                                    </Popover.Panel>
                                </>
                            )}
                        </Popover>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
