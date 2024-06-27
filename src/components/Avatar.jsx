import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

const Avatar = ({ user }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant='' id="avatar-dropdown">
                <div className="tw-relative">
                    <div className="tw-relative tw-inline-block tw-rounded-full tw-overflow-hidden tw-h-9 tw-w-9 md:tw-h-11 md:tw-w-11">
                        <img src={user || '/images/placeholder.jpg'} alt="Avatar" />
                    </div>
                    <span className="tw-absolute tw-block tw-rounded-full tw-bg-green-500 tw-ring-2 tw-ring-white tw-top-0 tw-right-0 tw-h-2 tw-w-2 md:tw-h-3 md:tw-w-3" />
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className=''>
                <Dropdown.Item href="">Logout</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Avatar;
