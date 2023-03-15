import { create } from 'zustand'

type SearchStore = {
    term: string
    setTerm: (term: string) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
    term: '',
    setTerm: (term) => set({ term })
}))
