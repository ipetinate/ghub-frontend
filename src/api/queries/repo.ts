import { api } from '@/api'

import { GitHubUser, RepositoriesResponse } from '@/types/github'
import { QueryKey } from '@tanstack/react-query'

export async function getRepoHandler({ queryKey }: { queryKey: QueryKey }) {
    const [endpoint, queries] = queryKey

    if (!queries) return

    const { data } = await api.get<RepositoriesResponse>(
        `${endpoint}?${queries}`
    )

    return data
}
