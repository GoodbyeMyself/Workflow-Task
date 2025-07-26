'use client'
import React, { Suspense } from 'react'
import { useContext } from 'use-context-selector'
import Select from '@/app/components/base/select/locale'
import Divider from '@/app/components/base/divider'
import { languages } from '@/i18n/language'
import type { Locale } from '@/i18n'
import I18n from '@/context/i18n'

// Avoid rendering the logo and theme selector on the server
const DifyLogo = React.lazy(() => import('@/app/components/base/logo/dify-logo'))

const ThemeSelector = React.lazy(() => import('@/app/components/base/theme-selector'))

const Header = () => {
    const { locale, setLocaleOnClient } = useContext(I18n)

    return (
        <div className='flex w-full items-center justify-between p-6'>
            <Suspense fallback={<div className='h-7 w-16 bg-transparent' />}>
                <DifyLogo size='large' />
            </Suspense>
            <div className='flex items-center gap-1'>
                <Select
                    value={locale}
                    items={languages.filter(item => item.supported)}
                    onChange={(value) => {
                        setLocaleOnClient(value as Locale, true)
                    }}
                />
                <Divider type='vertical' className='mx-0 ml-2 h-4' />
                <Suspense fallback={<div className='size-8 bg-transparent' />}>
                    <ThemeSelector />
                </Suspense>
            </div>
        </div>
    )
}

export default Header
