import { history, useLocation } from '@umijs/max'
import { useCallback, useEffect, useMemo, useState } from 'react'

export type AppsQuery = {
    tagIDs?: string[]
    keywords?: string
    isCreatedByMe?: boolean
}

// Parse the query parameters from the URL search string.
function parseParams(search: string): AppsQuery {
    const params = new URLSearchParams(search)
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
    const [query, setQuery] = useState<AppsQuery>(() => parseParams(location.search))

    const syncSearchParams = useCallback((params: URLSearchParams) => {
        const search = params.toString()
        const query = search ? `?${search}` : ''
        const newUrl = `${location.pathname}${query}`
        history.push(newUrl)
    }, [location.pathname])

    // Update the URL search string whenever the query changes.
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        updateSearchParams(query, params)
        syncSearchParams(params)
    }, [query, location.search, syncSearchParams])

    // 监听 URL 变化，同步到本地状态
    useEffect(() => {
        const newQuery = parseParams(location.search)
        setQuery(newQuery)
    }, [location.search])

    return useMemo(() => ({ query, setQuery }), [query])
}

export default useAppsQueryState
