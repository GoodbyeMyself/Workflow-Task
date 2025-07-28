'use client'
import type { FC } from 'react'
import { useNavigate } from 'umi'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ToolProviderList from '@/app/components/tools/provider-list'
import { useAppContext } from '@/context/app-context'
import useDocumentTitle from '@/hooks/use-document-title'
const ToolsList: FC = () => {
  const navigate = useNavigate()
  const { isCurrentWorkspaceDatasetOperator } = useAppContext()
  const { t } = useTranslation()
  useDocumentTitle(t('common.menus.tools'))

  useEffect(() => {
    if (isCurrentWorkspaceDatasetOperator)
      return navigate('/datasets', { replace: true })
  }, [isCurrentWorkspaceDatasetOperator, navigate])

  return <ToolProviderList />
}
export default React.memo(ToolsList)
