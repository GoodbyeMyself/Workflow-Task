'use client'

import {
  useEffect,
  useMemo,
} from 'react'
import {
  useNavigate,
  useSearchParams,
} from 'umi'
import EducationApplyPage from '@/app/education-apply/education-apply-page'
import { useProviderContext } from '@/context/provider-context'

export default function EducationApply() {
  const navigate = useNavigate()
  const { enableEducationPlan, isEducationAccount } = useProviderContext()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const showEducationApplyPage = useMemo(() => {
    return enableEducationPlan && !isEducationAccount && token
  }, [enableEducationPlan, isEducationAccount, token])

  useEffect(() => {
    if (!showEducationApplyPage)
      navigate('/')
  }, [showEducationApplyPage, navigate])

  return <EducationApplyPage />
}
