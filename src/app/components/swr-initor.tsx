'use client'

import { SWRConfig } from 'swr'
import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
// 替换 next/navigation 为 umi 的 hooks
import { useLocation, useNavigate } from 'umi'
import { fetchSetupStatus } from '@/service/common'
import {
  EDUCATION_VERIFYING_LOCALSTORAGE_ITEM,
  EDUCATION_VERIFY_URL_SEARCHPARAMS_ACTION,
} from '@/app/education-apply/constants'

type SwrInitorProps = {
  children: ReactNode
}
const SwrInitor = ({
  children,
}: SwrInitorProps) => {
  // 替换路由 hooks
  const navigate = useNavigate()
  const location = useLocation()
  // 解析 searchParams
  const searchParams = new URLSearchParams(location.search)
  const consoleToken = decodeURIComponent(searchParams.get('access_token') || '')
  const refreshToken = decodeURIComponent(searchParams.get('refresh_token') || '')
  const consoleTokenFromLocalStorage = localStorage?.getItem('console_token')
  const refreshTokenFromLocalStorage = localStorage?.getItem('refresh_token')
  const pathname = location.pathname
  const [init, setInit] = useState(false)

  const isSetupFinished = useCallback(async () => {
    try {
      if (localStorage.getItem('setup_status') === 'finished')
        return true
      const setUpStatus = await fetchSetupStatus()
      if (setUpStatus.step !== 'finished') {
        localStorage.removeItem('setup_status')
        return false
      }
      localStorage.setItem('setup_status', 'finished')
      return true
    }
    catch (error) {
      console.error(error)
      return false
    }
  }, [])

  useEffect(() => {
    (async () => {
      const action = searchParams.get('action')

      if (action === EDUCATION_VERIFY_URL_SEARCHPARAMS_ACTION)
        localStorage.setItem(EDUCATION_VERIFYING_LOCALSTORAGE_ITEM, 'yes')

      try {
        const isFinished = await isSetupFinished()
        if (!isFinished) {
          navigate('/install', { replace: true })
          return
        }
        if (!((consoleToken && refreshToken) || (consoleTokenFromLocalStorage && refreshTokenFromLocalStorage))) {
          navigate('/signin', { replace: true })
          return
        }
        if (searchParams.has('access_token') || searchParams.has('refresh_token')) {
          consoleToken && localStorage.setItem('console_token', consoleToken)
          refreshToken && localStorage.setItem('refresh_token', refreshToken)
          navigate(pathname, { replace: true })
        }

        setInit(true)
      }
      catch {
        navigate('/signin', { replace: true })
      }
    })()
    // 依赖项保持一致
  }, [isSetupFinished, navigate, pathname, location.search, consoleToken, refreshToken, consoleTokenFromLocalStorage, refreshTokenFromLocalStorage])

  return init
    ? (
      <SWRConfig value={{
        shouldRetryOnError: false,
        revalidateOnFocus: false,
      }}>
        {children}
      </SWRConfig>
    )
    : null
}

export default SwrInitor
