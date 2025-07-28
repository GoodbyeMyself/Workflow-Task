'use client'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { history } from '@umijs/max'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '@/context/app-context'
import useDocumentTitle from '@/hooks/use-document-title'

export type IAppDetail = {
  children: React.ReactNode
}

const AppDetail: FC<IAppDetail> = ({ children }) => {
  const { isCurrentWorkspaceDatasetOperator } = useAppContext()
  const { t } = useTranslation()
  useDocumentTitle(t('common.menus.appDetail'))

  useEffect(() => {
    if (isCurrentWorkspaceDatasetOperator)
      return history.replace('/datasets')
  }, [isCurrentWorkspaceDatasetOperator])

  return (
    <>
      {children}
    </>
  )
}

export default React.memo(AppDetail)
