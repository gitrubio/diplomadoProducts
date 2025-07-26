import {  SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


export default function SearchInput() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("")

    useEffect(() => {
        const storeIdPattern = /^\/store\/[\w-]+$/;
        
        if(!window.location.search && !storeIdPattern.test(window.location.pathname)){
            setSearch("");  
        }
    },[window.location.pathname])


    return (
        <form  className="flex" onSubmit={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            // @ts-ignore
            const searchTerm = e.target.search.value;
            navigate(`/store?search=${searchTerm}`)
        }}>
            <div className="relative text-black">
                <input
                    placeholder="Buscar en Clean Print"
                    className="w-50 md:w-96  border-2 border-gray-400 focus:border-blue-600 h-12  px-5 py-3 rounded-xl outline-none "
                    name="search"
                    value={search}
                    onChange={(e)=>{ setSearch(e.target.value) }}
                    
                   
                
                />
              <SearchIcon className="size-6 absolute top-3 right-3 text-gray-500" />
                
            </div>
        </form>
    )
}
