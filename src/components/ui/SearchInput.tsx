import {  SearchIcon } from 'lucide-react'

interface SearchInputProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
}
export default function SearchInput({ searchTerm, setSearchTerm }: SearchInputProps) {


    return (
        <form  className="flex">
            <div className="relative">
                <input
                    placeholder="Buscar..."
                    className="input shadow-lg focus:border-2 h-12 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
                    name="search"
                    type="search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                
                />
               {!searchTerm &&  <SearchIcon className="size-6 absolute top-3 right-3 text-gray-500" />}
                
            </div>
        </form>
    )
}
