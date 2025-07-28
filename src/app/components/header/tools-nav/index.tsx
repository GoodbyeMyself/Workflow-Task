'use client'

import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'umi'
import {
  RiHammerFill,
  RiHammerLine,
} from '@remixicon/react'
import classNames from '@/utils/classnames'
type ToolsNavProps = {
  className?: string
}

const ToolsNav = ({
  className,
}: ToolsNavProps) => {
  const { t } = useTranslation()
  const location = useLocation()
  // 判断当前路径是否以 /tools 开头
  const activated = location.pathname.startsWith('/tools')

  return (
    <Link to="/tools" className={classNames(
      'group text-sm font-medium',
      activated && 'font-semibold bg-components-main-nav-nav-button-bg-active hover:bg-components-main-nav-nav-button-bg-active-hover shadow-md',
      activated ? 'text-components-main-nav-nav-button-text-active' : 'text-components-main-nav-nav-button-text hover:bg-components-main-nav-nav-button-bg-hover',
      className,
    )}>
      {
        activated
          ? <RiHammerFill className='mr-2 h-4 w-4' />
          : <RiHammerLine className='mr-2 h-4 w-4' />
      }
      {t('common.menus.tools')}
    </Link>
  )
}

export default ToolsNav
