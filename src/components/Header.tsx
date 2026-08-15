import { FaNoteSticky } from "react-icons/fa6";
import Avatar from './Avatar';
import { NavLink } from 'react-router'

const Header = (
  { shareMode = false, sharedModeUser }: { shareMode?: boolean, sharedModeUser?: string }
) => {

  return (
    <header className="text-gray-600 body-font border-b bg-neutral-50 sticky top-0 z-10">
      <div className="mx-auto flex flex-wrap py-1 px-5 items-center">
        <NavLink to="/app" className="flex title-font font-medium items-center text-gray-900">
          <FaNoteSticky size={35} className='text-indigo-900' />
          <span className="select-none ml-2 text-2xl font-bold text-indigo-800">Shivam Keep</span>
        </NavLink>

        <div className="ml-auto flex items-center gap-1">
          {shareMode && sharedModeUser ?
            <div className={'rounded-full flex items-center outline-none'}>
              <span className={'mx-1 outline-none focus:ring-2 ring-indigo-600 bg-indigo-900 px-4 py-2 rounded-full font-semibold text-neutral-50 flex items-center gap-1'}>
                {sharedModeUser}'s Notes
              </span>
            </div>
            :
            <div className={'rounded-full flex items-center outline-none'}>
              <Avatar />
            </div>
          }
        </div>
      </div>
    </header>
  )
}

export default Header