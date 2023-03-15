import { useCallback } from 'react'

import { debounce } from 'lodash'

export function useDebounce<T, K>(time: number, callback: (value: T) => K) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const executeDebouncedCallback = useCallback(debounce(callback, time), [
        debounce,
        callback,
        time
    ])

    return [executeDebouncedCallback]
}
