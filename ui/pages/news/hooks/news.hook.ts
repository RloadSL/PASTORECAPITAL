import { News } from "domain/News/News"
import newsRepository, { QUERY_NEWS } from "infrastructure/repositories/news.repository"
import webinarsRepository from "infrastructure/repositories/webinars.repository"
import { useState } from "react"

const useNews = ()=>{
  const [news, setNews] = useState<News[]>([])
  const [isloaded, setLoaded] = useState(true)
  const [query, setQuery] = useState<QUERY_NEWS>({ search: '', items: 10})
  const [total_pages, setTotal_pages] = useState(0)
  const [page, setPage] = useState(1)


  const handleSearchNews = async (customQuery: any = query) => {
    let fetching = true
    if (isloaded) {
      setLoaded(false)
      const response = await newsRepository.getNews({...query, page,...customQuery})
      if (fetching) {
        setTotal_pages(response.total_pages)
        setNews(pre => [...pre, ...response.data])
        setTimeout(() => {
          setLoaded(true)
        }, 1000);
       
      }
    }
    return () => (fetching = false)
  }

  const loadMore = () => {
    console.log('Load more' , isloaded)
    if (isloaded) {
      handleSearchNews({page: page + 1})
      setPage(pre => pre +1);
    }
  }

  const onFilter = async (s: string) => {
    if (isloaded) {
      setPage(1)
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
    page,
    handleSearchNews,
    loadMore,
    onFilter
  }
}

export default useNews