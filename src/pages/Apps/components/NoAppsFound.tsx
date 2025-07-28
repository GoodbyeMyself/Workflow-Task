import React from 'react';

// i18n
import { useTranslation } from 'react-i18next';

const NoAppsFound: React.FC = () => {

    const { t } = useTranslation()

    function renderDefaultCard() {
        const defaultCards = Array.from({ length: 36 }, (_, index) => (
            <div key={index} className='inline-flex h-[160px] rounded-xl bg-background-default-lighter'></div>
        ))
        return defaultCards
    }

    return (
        <>
            {renderDefaultCard()}
            <div className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gradient-to-t from-background-body to-transparent'>
                <span className='system-md-medium text-text-tertiary'>{t('app.newApp.noAppsFound')}</span>
            </div>
        </>
    )
};

NoAppsFound.displayName = 'CreateAppCard'

export default NoAppsFound

export { NoAppsFound }