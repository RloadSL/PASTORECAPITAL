import { Chatroom } from "domain/Chatroom/Chatroom"
import { ELASTIC_QUERY } from "infrastructure/elasticsearch/search.elastic"
import amasRepository from "infrastructure/repositories/amas.repository"
import { useState } from "react"

const useAmas = ()=>{
  const [amas, setAmas] = useState<Chatroom[]>([])
  const [isloaded, setLoaded] = useState(true)
  const [query, setQuery] = useState<ELASTIC_QUERY>({ query: '', filters: {} })
  const [pages, setPages] = useState<any>()

  const handleSearchAmas = async (customQuery: any = query) => {
    let fetching = true
    if (isloaded) {
      setLoaded(false)
      const response = await amasRepository.getChatRooms({...query, ...customQuery})
      if (fetching) {
        setLoaded(true)
        if(response.page.current != pages?.current || amas.length === 0){
          setPages(response.page)
          setAmas(pre => [...response.results, ...pre])
        }
        
      }
    }
    return () => (fetching = false)
  }

  const loadMore = () => {
    if (isloaded) {
      setQuery(pre => {
        const current = pre.page?.current || 1

        return {
          ...pre,
          page: {
            current: current + 1,
            size: 10
          }
        }
      })
    }
  }

  const onFilter = async (s?: string, filter?:any) => {
    
    if (isloaded) {
      setAmas([])

      setQuery((pre:any) => {
        if(s || s == ''){
          const data = {
            ...pre,
            query: s
          }
          return data
        }

        if(filter){
          const data = {
            ...pre,
            filters: filter
          }
          return data
        }

        return pre;
      })
    }
  }

  return {
    amas,
    isloaded,
    pages,
    query,
    handleSearchAmas,
    loadMore,
    onFilter
  }
}

export default useAmas