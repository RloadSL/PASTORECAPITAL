import { Webinars } from "domain/Webinars/Webinars"
import { ELASTIC_QUERY } from "infrastructure/elasticsearch/search.elastic"
import webinarsRepository from "infrastructure/repositories/webinars.repository"
import { useState } from "react"

const useWebinars = ()=>{
  const [webinars, setWebinars] = useState<Webinars[]>([])
  const [isloaded, setLoaded] = useState(false)
  const [query, setQuery] = useState<ELASTIC_QUERY>({ query: '', filters: {state : ['COMING' , 'ONLIVE']} })
  const [pages, setPages] = useState<any>()

  const handleSearchWebinars = async (customQuery: any = query) => {
    let fetching = true
    if (!isloaded) {
      const response = await webinarsRepository.elasticSearch({...query, ...customQuery})
      if (fetching) {
        setLoaded(true)
        setPages(response.page)
        setWebinars(pre => [...response.results, ...pre])
      }
    }
    return () => (fetching = false)
  }

  const loadMore = () => {
    if (isloaded) {
      setLoaded(false)
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

  const onFilter = async (s: string) => {
    if (isloaded) {
      setLoaded(false)
      setWebinars([])
      setQuery(pre => ({
        ...pre,
        query: s
      }))
    }
  }

  return {
    webinars,
    setWebinars,
    isloaded,
    pages,
    query,
    handleSearchWebinars,
    loadMore,
    onFilter
  }
}

export default useWebinars