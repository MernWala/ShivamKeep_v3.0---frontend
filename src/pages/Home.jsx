import React from 'react'
import NewBtn from '../components/NewBtn'
import Notes from '../components/Notes'
import Header from '../components/Header'

const Home = () => {
    return (
        <>
            <Header />
            <div className='tw-bg-neutral-100 tw-min-h-[85.2vh3] tw-relative'>
                <NewBtn />
                <div className='md:tw-p-10 tw-p-3'>
                    <div className="tw-flex tw-flex-wrap">
                        <Notes />
                        <Notes />
                        <Notes />
                        <Notes />
                        <Notes />
                        <Notes />
                        <Notes />
                        <Notes />
                        <Notes />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home