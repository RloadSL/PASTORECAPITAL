import { News } from "domain/News/News"
import newsRepository, { QUERY_NEWS } from "infrastructure/repositories/news.repository"
import webinarsRepository from "infrastructure/repositories/webinars.repository"
import { useState } from "react"

const useNews = ()=>{
  const [news, setNews] = useState<News[]>([])
  const [isloaded, setLoaded] = useState(false)
  const [query, setQuery] = useState<QUERY_NEWS>({ search: '', items: 3, page: 1})
  const [total_pages, setTotal_pages] = useState(0)

  const handleSearchNews = async (customQuery: any = query) => {
    let fetching = true
    if (!isloaded) {
      const response = await newsRepository.getNews({...query, ...customQuery})
      if (fetching) {
        setLoaded(true)
        setTotal_pages(response.total_pages)
        setNews(pre => [...response.data, ...pre])
      }
    }
    return () => (fetching = false)
  }

  const loadMore = () => {
    if (isloaded) {
      console.log('loadMore')

      setLoaded(false)
      setQuery(pre => {
        const current = pre.page || 1

        return {
          ...pre,
          page:  current + 1
        }
      })
    }
  }

  const onFilter = async (s: string) => {
    if (isloaded) {
      setLoaded(false)
      setNews([])
      setQuery(pre => ({
        ...pre,
        search: s
      }))
    }
  }

  return {
    news,
    setNews,
    isloaded,
    total_pages,
    query,
    handleSearchNews,
    loadMore,
    onFilter
  }
}

export default useNews