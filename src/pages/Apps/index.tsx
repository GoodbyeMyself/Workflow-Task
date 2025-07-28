import { useCallback, useRef, useState } from 'react';
// ui 组件
import TabSliderNew from '@/app/components/base/tab-slider-new';
import TagFilter from '@/app/components/base/tag-management/filter';
import CheckboxWithLabel from '@/app/components/datasets/create/website/base/checkbox-with-label';
import Input from '@/app/components/base/input';
// 业务 组件
import NewAppCard from './components/NewAppCard';
// 业务 hook
import { useDebounceFn } from 'ahooks'
import { useTabSearchParams } from '@/hooks/use-tab-searchparams';
import useAppsQueryState from '@/hooks/useAppsQueryState';
// 请求
import useSWRInfinite from 'swr/infinite';
// 接口
import { fetchAppList } from '@/service/apps';
// Icon
import {
    RiApps2Line,
    RiExchange2Line,
    RiFile4Line,
    RiMessage3Line,
    RiRobot3Line,
} from '@remixicon/react';
// 类型
import type { AppListResponse } from '@/models/app'

const getKey = (
    pageIndex: number,
    previousPageData: AppListResponse,
    activeTab: string,
    isCreatedByMe: boolean,
    tags: string[],
    keywords: string,
) => {
    if (!pageIndex || previousPageData.has_more) {
        const params: any = { url: 'apps', params: { page: pageIndex + 1, limit: 30, name: keywords, is_created_by_me: isCreatedByMe } }

        if (activeTab !== 'all')
            params.params.mode = activeTab
        else
            delete params.params.mode

        if (tags.length)
            params.params.tag_ids = tags

        return params
    }
    return null
}

const HomePage: React.FC = () => {

    const newAppCardRef = useRef<HTMLDivElement>(null)

    const [activeTab, setActiveTab] = useTabSearchParams({
        defaultTab: 'all',
    })

    const options = [
        { value: 'all', text: '全部', icon: <RiApps2Line className='mr-1 h-[14px] w-[14px]' /> },
        { value: 'chat', text: '聊天助手', icon: <RiMessage3Line className='mr-1 h-[14px] w-[14px]' /> },
        { value: 'agent-chat', text: 'Agent', icon: <RiRobot3Line className='mr-1 h-[14px] w-[14px]' /> },
        { value: 'completion', text: '文字生成', icon: <RiFile4Line className='mr-1 h-[14px] w-[14px]' /> },
        { value: 'advanced-chat', text: '聊天流', icon: <RiMessage3Line className='mr-1 h-[14px] w-[14px]' /> },
        { value: 'workflow', text: '工作流', icon: <RiExchange2Line className='mr-1 h-[14px] w-[14px]' /> },
    ];

    const { query: { tagIDs = [], keywords = '', isCreatedByMe: queryIsCreatedByMe = false }, setQuery } = useAppsQueryState()

    const [isCreatedByMe, setIsCreatedByMe] = useState(queryIsCreatedByMe)

    const [tagFilterValue, setTagFilterValue] = useState<string[]>(tagIDs)

    const [searchKeywords, setSearchKeywords] = useState(keywords)

    const handleCreatedByMeChange = useCallback(() => {
        const newValue = !isCreatedByMe
        setIsCreatedByMe(newValue)
        setQuery(prev => ({ ...prev, isCreatedByMe: newValue }))
    }, [isCreatedByMe, setQuery])

    const setTagIDs = useCallback((tagIDs: string[]) => {
        setQuery(prev => ({ ...prev, tagIDs }))
    }, [setQuery])

    const { run: handleTagsUpdate } = useDebounceFn(() => {
        setTagIDs(tagFilterValue)
    }, { wait: 500 })

    const handleTagsChange = (value: string[]) => {
        setTagFilterValue(value)
        handleTagsUpdate()
    }

    const setKeywords = useCallback((keywords: string) => {
        setQuery(prev => ({ ...prev, keywords }))
    }, [setQuery])

    const { run: handleSearch } = useDebounceFn(() => {
        setSearchKeywords(keywords)
    }, { wait: 500 })

    const handleKeywordsChange = (value: string) => {
        setKeywords(value)
        handleSearch()
    }

    const { data, isLoading, error, setSize, mutate } = useSWRInfinite(
        (pageIndex: number, previousPageData: AppListResponse) => getKey(pageIndex, previousPageData, activeTab, isCreatedByMe, tagIDs, searchKeywords),
        fetchAppList,
        {
            revalidateFirstPage: true,
            shouldRetryOnError: false,
            dedupingInterval: 500,
            errorRetryCount: 3,
        },
    )

    console.log(data, '<--');

    return (
        <div className='relative flex h-full shrink-0 grow flex-col overflow-y-auto bg-background-body'>
            <div className='sticky top-0 z-10 flex flex-wrap items-center justify-between gap-y-2 bg-background-body px-12 pb-2 pt-4 leading-[56px]'>
                <TabSliderNew
                    value={activeTab}
                    onChange={setActiveTab}
                    options={options}
                />
                <div className='flex items-center gap-2'>
                    <CheckboxWithLabel
                        className='mr-2'
                        label={'我建立的'}
                        isChecked={isCreatedByMe}
                        onChange={handleCreatedByMeChange}
                    />
                    <TagFilter type='app' value={tagFilterValue} onChange={handleTagsChange} />
                    <Input
                        showLeftIcon
                        showClearIcon
                        wrapperClassName='w-[200px]'
                        value={keywords}
                        onChange={e => handleKeywordsChange(e.target.value)}
                        onClear={() => handleKeywordsChange('')}
                    />
                </div>
            </div>
            <div className='relative grid grow grid-cols-1 content-start gap-4 px-12 pt-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 2k:grid-cols-6'>
                <NewAppCard ref={newAppCardRef} />
            </div>
        </div>
    );
};

export default HomePage;
