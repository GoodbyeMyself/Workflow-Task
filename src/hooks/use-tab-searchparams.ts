'use client'
import { history, useLocation } from '@umijs/max'
import { useState, useEffect } from 'react'

type UseTabSearchParamsOptions = {
    defaultTab: string
    routingBehavior?: 'push' | 'replace'
    searchParamName?: string
    disableSearchParams?: boolean
}

/**
 * Custom hook to manage tab state via URL search parameters in a UmiJS application.
 * This hook allows for syncing the active tab with the browser's URL, enabling bookmarking and sharing of URLs with a specific tab activated.
 *
 * @param {UseTabSearchParamsOptions} options Configuration options for the hook:
 * - `defaultTab`: The tab to default to when no tab is specified in the URL.
 * - `routingBehavior`: Optional. Determines how changes to the active tab update the browser's history ('push' or 'replace'). Default is 'push'.
 * - `searchParamName`: Optional. The name of the search parameter that holds the tab state in the URL. Default is 'category'.
 * @returns A tuple where the first element is the active tab and the second element is a function to set the active tab.
 */
export const useTabSearchParams = ({
    defaultTab,
    routingBehavior = 'push',
    searchParamName = 'category',
    disableSearchParams = false,
}: UseTabSearchParamsOptions) => {
    const location = useLocation()
    const [activeTab, setTab] = useState<string>(() => {
        if (disableSearchParams) {
            return defaultTab
        }
        
        const urlParams = new URLSearchParams(location.search)
        return urlParams.get(searchParamName) || defaultTab
    })

    // 监听 URL 变化
    useEffect(() => {
        if (disableSearchParams) return
        
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get(searchParamName)
        if (tabFromUrl && tabFromUrl !== activeTab) {
            setTab(tabFromUrl)
        }
    }, [location.search, searchParamName, disableSearchParams, activeTab])

    const setActiveTab = (newActiveTab: string) => {
        setTab(newActiveTab)
        if (disableSearchParams) return
        
        const urlParams = new URLSearchParams(location.search)
        urlParams.set(searchParamName, newActiveTab)
        
        const newUrl = `${location.pathname}?${urlParams.toString()}`
        
        if (routingBehavior === 'replace') {
            history.replace(newUrl)
        } else {
            history.push(newUrl)
        }
    }

    return [activeTab, setActiveTab] as const
}
