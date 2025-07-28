import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'umi'

type AppsQuery = {
  tagIDs?: string[]
  keywords?: string
  isCreatedByMe?: boolean
}

// Parse the query parameters from the URL search string.
function parseParams(params: URLSearchParams): AppsQuery {
  const tagIDs = params.get('tagIDs')?.split(';')
  const keywords = params.get('keywords') || undefined
  const isCreatedByMe = params.get('isCreatedByMe') === 'true'
  return { tagIDs, keywords, isCreatedByMe }
}

// Update the URL search string with the given query parameters.
function updateSearchParams(query: AppsQuery, current: URLSearchParams) {
  const { tagIDs, keywords, isCreatedByMe } = query || {}

  if (tagIDs && tagIDs.length > 0)
    current.set('tagIDs', tagIDs.join(';'))
  else
    current.delete('tagIDs')

  if (keywords)
    current.set('keywords', keywords)
  else
    current.delete('keywords')

  if (isCreatedByMe)
    current.set('isCreatedByMe', 'true')
  else
    current.delete('isCreatedByMe')
}

function useAppsQueryState() {
  const location = useLocation()
  const navigate = useNavigate()

  // 解析 searchParams
  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search)
  }, [location.search])

  const [query, setQuery] = useState<AppsQuery>(() => parseParams(searchParams))

  const pathname = location.pathname
  const syncSearchParams = useCallback((params: URLSearchParams) => {
    const search = params.toString()
    const queryStr = search ? `?${search}` : ''
    navigate(`${pathname}${queryStr}`, { replace: true })
  }, [navigate, pathname])

  // Update the URL search string whenever the query changes.
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    updateSearchParams(query, params)
    syncSearchParams(params)
  }, [query, location.search, syncSearchParams])

  return useMemo(() => ({ query, setQuery }), [query])
}

export default useAppsQueryState
