import { SearchProps } from '../types/note'

export default function Search({ searchFilter }: SearchProps) {
    return (
        <input type="text" className="form-control me-2 search-input" onChange={(e) => searchFilter(e.target.value)} name="search" placeholder="Search" aria-label="Search" />

    )
}
