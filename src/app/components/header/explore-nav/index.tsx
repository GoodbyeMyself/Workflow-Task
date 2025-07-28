'use client'

import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'umi'
import {
  RiPlanetFill,
  RiPlanetLine,
} from '@remixicon/react'
import classNames from '@/utils/classnames'
type ExploreNavProps = {
  className?: string
}

const ExploreNav = ({
  className,
}: ExploreNavProps) => {
  const { t } = useTranslation()
  const location = useLocation()
  // 判断当前路径是否以 /explore 开头
  const activated = location.pathname.startsWith('/explore')

  return (
    <Link to="/explore/apps" className={classNames(
      className, 'group',
      activated && 'bg-components-main-nav-nav-button-bg-active shadow-md',
      activated ? 'text-components-main-nav-nav-button-text-active' : 'text-components-main-nav-nav-button-text hover:bg-components-main-nav-nav-button-bg-hover',
    )}>
      {
        activated
          ? <RiPlanetFill className='mr-2 h-4 w-4' />
          : <RiPlanetLine className='mr-2 h-4 w-4' />
      }
      {t('common.menus.explore')}
    </Link>
  )
}

export default ExploreNav
