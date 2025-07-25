import { useRef } from 'react';

import NewAppCard from './components/NewAppCard'

const HomePage: React.FC = () => {

    const newAppCardRef = useRef<HTMLDivElement>(null)

    return (
        <div className='relative flex h-full shrink-0 grow flex-col overflow-y-auto bg-background-body'>
            <div className='relative grid grow grid-cols-1 content-start gap-4 px-12 pt-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 2k:grid-cols-6'>
                <NewAppCard ref={newAppCardRef} />
            </div>
        </div>
    );
};

export default HomePage;
