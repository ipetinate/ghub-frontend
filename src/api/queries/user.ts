import { api } from '@/api'

import { GitHubUser } from '@/types/github'

import { QueryKey } from '@tanstack/react-query'

export async function getUserHandler({ queryKey }: { queryKey: QueryKey }) {
    const [endpoint, username] = queryKey

    if (!username) return

    const { data } = await api.get<GitHubUser>(`${endpoint}/${username}`)

    return data
}
