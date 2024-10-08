import React, { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';
import BuildIcon from '@mui/icons-material/Build';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import {
Dialog,
  DialogBackdrop,
  DisclosureButton,
  DisclosurePanel,
  DialogPanel,
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';


interface AppNavigationProps {
  inner_content: React.ReactNode;
}

type NavigationItem = {
  name: string;
  Link: string;
};

const projectTools : NavigationItem[] = [
  { name: 'Directory', Link: '/project/:id/project-directory' },
  { name: 'Daily Logs', Link: '/project/:id/daily-logs/:id' },
  { name: 'Meetings', Link: '/project/:id/meetings' },
  { name: 'Submittals', Link: '/project/:id/submittals' },
  { name: 'Transmittals', Link: '/project/:id/transmittals' },
  { name: 'RFIs', Link: '/project/:id/request-for-information' },
  { name: 'Documents', Link: '/project/:id/documents' },
  { name: 'Procurement', Link: '/project/:id/procurement' },
  { name: 'Schedule', Link: '/project/:id/schedule' },
  { name: 'Drawings', Link: '/project/:id/drawings' },
  { name: 'Punch List', Link: '/project/:id/punch-list' },
  { name: 'Close Out', Link: '/project/:id/close-out' },
  { name: 'Reports', Link: '/project/:id/reports' }, // Assuming this route exists
  { name: 'To-Do List', Link: '/project/:id/to-do-list' }  // Assuming this route exists
];


const userNavigation : NavigationItem[] =  [
  { name: 'Your profile', Link: '#' },
  { name: 'Sign out', Link: '#' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const AppNavigation: React.FC<AppNavigationProps> = ({ inner_content }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const location = useLocation();

  function isActive(Link: string): boolean {
    return location.pathname === Link;
  }
 
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setSidebarOpen(false); 
  };

  return (
    <>
      <div>
        <Dialog className="relative z-50 lg:hidden " open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <Transition show={sidebarOpen} as={Fragment}>
            <DialogBackdrop className="fixed inset-0 transition-opacity duration-300 ease-linear" />
            <div className="fixed inset-0 flex">
              <DialogPanel className="relative mr-8 flex max-w-60 flex-1 transform transition duration-300 ease-in-out bg-black px-6 border-r border-gray-400 ">
                <div className="flex grow flex-col gap-y-3 overflow-y-auto">
                  {sidebarOpen && (
                    <div className="sticky top-0 z-60 flex h-12 shrink-0 items-center bg-gray-950">
                    <div className="ml-1 mt-4">
                      <img 
                        src="/logos/conflo logo no back ground.png" 
                        alt="CONFLO" 
                        style={{ minWidth: '200px',}}/>
                    </div>
                  </div>
                  )}
                  <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col">

                      {/* Project Dashboard button */}
                      <li>
                        <Link
                          to="/dashboard/project/:id"
                          className={`block pb-3 text-md  border-1 border-gray-600 border-b font-semibold text-white hover:text-yellow-400 ${isActive('/dashboard/project/:id') ? 'text-yellow-400 underline' : ''} flex items-center space-x-2`}
                          onClick={handleLinkClick} // Using the handler to close the sidebar

                        >
                          <FaTachometerAlt className="ml-2 mr-1 h-5 w-5 text-white" aria-hidden="true"/>
                          <span className='text-md'>Project Dashboard</span>
                        </Link>
                      </li>

                      {/* Project Tools Accordion */}
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <DisclosureButton className="w-full border-1 border-gray-600 border-b py-3 text-md font-semibold text-white hover:text-yellow-400 flex justify-between items-center">
                              <span className="ml-1 flex items-center space-x-2">
                                <BuildIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                <span className='text-md'>Project Tools</span>
                              </span>
                              <ChevronDownIcon className={`${open ? 'rotate-180' : ''} w-5 h-5 text-yellow-400 `} />
                            </DisclosureButton>
                            <DisclosurePanel>
                              {projectTools.map((tool, index) => (
                                  <Fragment key={index}> {/* Assigning a unique key */}
                                    <Link
                                        to={tool.Link}
                                        className={`block ml-8 py-2.5 pl-2 text-sm font-medium text-white hover:text-yellow-400 ${isActive(tool.Link) ? 'text-yellow-400 ' : ''} flex items-center space-x-2`}
                                        onClick={handleLinkClick}
                                    >
                                      <span>{tool.name}</span>
                                    </Link>
                                    <hr className='ml-9 border-gray-600' />
                                  </Fragment>
                              ))}
                            </DisclosurePanel>

                          </>
                        )}
                      </Disclosure>

                      {/* Financial Management Accordion */}
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <DisclosureButton className="w-full text-md border-1 border-gray-600 border-b font-semibold text-white hover:text-yellow-400 flex justify-between items-center py-3">
                              <span className="ml-1 flex items-center space-x-2 ">
                                <AccountBalanceIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                <span className='text-md '>Financial Tools</span>
                              </span>
                              <ChevronDownIcon className={`${open ? 'rotate-180' : ''} w-5 h-5 text-yellow-400`} />
                            </DisclosureButton>
                            <DisclosurePanel className="">
                              <Link
                                to="/financial-management"
                                className={`block ml-6 py-2.5 px-4 text-sm font-medium text-white hover:text-yellow-400 ${isActive('/financial-management') ? 'text-yellow-400 underline' : ''} flex items-center space-x-2`}
                                onClick={handleLinkClick} // Using the handler to close the sidebar
                              >
                                <span>Overview</span>
                              </Link>
                              <hr className='ml-9 border-gray-600'/>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>

                      {/* Bid Management Accordion */}
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <DisclosureButton className="w-full py-3 border-1 border-gray-600 border-b text-md font-semibold text-white hover:text-yellow-400 flex justify-between items-center">
                              <span className="ml-1 flex items-center space-x-2 ">
                              <GavelIcon className="h-6 w-6 text-white" aria-hidden="true" />
                              <span className='text-md '>Bid Management</span>
                              </span>
                              <ChevronDownIcon className={`${open ? 'rotate-180' : ''} w-5 h-5 text-yellow-400`} />
                            </DisclosureButton>
                            <DisclosurePanel>
                              <Link
                                to="/bid-management"
                                className={`block ml-6 py-2.5 px-4 text-sm font-medium text-white hover:text-yellow-400 ${isActive('/bid-management') ? 'text-yellow-400 underline' : ''} flex items-center space-x-2`}
                                onClick={handleLinkClick} // Using the handler to close the sidebar
                              >
                                <span>Overview</span>
                              </Link>
                              <hr className='ml-9 border-gray-600'/>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </div>
          </Transition>
        </Dialog>
      </div>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col ">
        <div className="flex grow flex-col gap-y-3 overflow-y-auto bg-gray-950 px-4">
          <div className="sticky top-0 z-60 flex h-12 shrink-0 items-center bg-gray-950">
            <div className="ml-1 mt-4">
              <img 
                src="/logos/conflo logo no back ground.png" 
                alt="CONFLO" 
                style={{ minWidth: '200px',}}
                />
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col">

              {/* Project Dashboard button */}
              <li>
                <Link
                  to="/dashboard/project/:id"
                  className={`block pb-3 text-md  border-1 border-gray-600 border-b  font-semibold text-white hover:text-yellow-400 ${isActive('/dashboard/project/:id') ? 'text-yellow-400 underline' : ''} flex items-center space-x-2`}
                >
                  <FaTachometerAlt className="ml-2 mr-1 h-5 w-5 text-white" aria-hidden="true"/>
                  <span className='text-md'>Project Dashboard</span>
                </Link>
              </li>

              {/* Project Tools Accordion */}
              <Disclosure>
                {({ open }) => (
                  <>
                    <DisclosureButton className="w-full border-1 border-gray-600 border-b py-3 text-md font-semibold text-white hover:text-yellow-400 flex justify-between items-center">
                      <span className="ml-1 flex items-center space-x-2">
                        <BuildIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        <span className='text-md'>Project Tools</span>
                      </span>
                      <ChevronDownIcon className={`${open ? 'rotate-180' : ''} w-5 h-5 text-yellow-400 `} />
                    </DisclosureButton>
                    <DisclosurePanel >
                      {projectTools.map((tool, index) => (
                        <>
                        <Link
                          key={index}
                          to={tool.Link}
                          className={`block ml-8 py-2.5 pl-2 text-sm font-medium text-white hover:text-yellow-400 ${isActive(tool.Link) ? 'text-yellow-400 ' : ''} flex items-center space-x-2`}
                          onClick={()=>setSidebarOpen(false)}
                        >
                          <span>{tool.name}</span>
                        </Link>
                        <hr className='ml-9 border-gray-600'/>
                        </>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>

              {/* Financial Management Accordion */}
              <Disclosure>
                {({ open }) => (
                  <>
                    <DisclosureButton className="w-full text-md border-1 border-gray-600 border-b font-semibold text-white hover:text-yellow-400 flex justify-between items-center py-3">
                      <span className="ml-1 flex items-center space-x-2 ">
                        <AccountBalanceIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        <span className='text-md '>Financial Tools</span>
                      </span>
                      <ChevronDownIcon className={`${open ? 'rotate-180' : ''} w-5 h-5 text-yellow-400`} />
                    </DisclosureButton>
                    <DisclosurePanel className="">
                      <Link
                        to="/financial-management"
                        className={`block ml-6 py-2.5 px-4 text-sm font-medium text-white hover:text-yellow-400 ${isActive('/financial-management') ? 'text-yellow-400 underline' : ''} flex items-center space-x-2`}
                      >
                        <span>Overview</span>
                      </Link>
                      <hr className='ml-9 border-gray-600'/>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>

              {/* Bid Management Accordion */}
              <Disclosure>
                {({ open }) => (
                  <>
                    <DisclosureButton className="w-full py-3 border-1 border-gray-600 border-b text-md font-semibold text-white hover:text-yellow-400 flex justify-between items-center">
                      <span className="ml-1 flex items-center space-x-2 ">
                      <GavelIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      <span className='text-md '>Bid Management</span>
                      </span>
                      <ChevronDownIcon className={`${open ? 'rotate-180' : ''} w-5 h-5 text-yellow-400`} />
                    </DisclosureButton>
                    <DisclosurePanel>
                      <Link
                        to="/bid-management"
                        className={`block ml-6 py-2.5 px-4 text-sm font-medium text-white hover:text-yellow-400 ${isActive('/bid-management') ? 'text-yellow-400 underline' : ''} flex items-center space-x-2`}
                      >
                        <span>Overview</span>
                      </Link>
                      <hr className='ml-9 border-gray-600'/>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </ul>
          </nav>
          <div className='pb-24'>{/* padding at bottom when scrolling sidebar*/}</div>
        </div>
      </div>
      <div className="lg:pl-60">
        <div className="fixed top-0 left-0 right-0 z-40 flex h-12 items-center gap-x-4 bg-gray-950 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:pl-72 lg:pr-8">
          <button type="button" className="-m-2.5 px-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="h-6 w-px bg-gray-900/10 lg:hidden mr-auto ml-auto" aria-hidden="true" />
          <div className="flex flex-1 items-center gap-x-4 self-stretch ">
            <div className="sm:hidden flex grow flex-col gap-y-5 overflow-y-auto items-center ml-3 ring-white/10">
              <div className="flex h-14 shrink-0 items-center">
                <div className="mt-5">
                {!sidebarOpen && (
                  <img 
                    src="/logos/conflo logo no back ground.png" 
                    alt="CONFLO" 
                    style={{ width: '240px',}}
                  />
                )}
                  </div>
              </div>
            </div>
            <form className="hidden sm:flex relative flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">Search</label>
              <MagnifyingGlassIcon
                className="pointer-events-none absolute inset-y-0 left-2 h-full w-4 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="search-field"
                className="block h-8 w-full border-0 py-1.5 pl-8 pr-4 text-gray-900 placeholder:text-gray-400  sm:text-sm bg-white rounded-full"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </form>
            <div className="flex items-center gap-x-4 pl-8">
              <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />
              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-4 text-sm font-semibold leading-6 text-white" aria-hidden="true">
                      Tom Cook
                    </span>
                    <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </MenuButton>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item, index) => (
                        <MenuItem key={index}>
                          {({ focus }) => (
                              <Link
                                  to={item.Link}
                                  className={classNames(focus ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}
                              >
                                {item.name}
                              </Link>
                          )}
                        </MenuItem>
                    ))}
                  </MenuItems>

                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <main style={{ marginTop: '48px' }}>
          <div className='fixed bg-white lg:rounded-l-xl min-h-full w-full  lg:w-[calc(100vw-240px)] '> 
            <div className='absolute left-0 w-full h-full overflow-y-auto'>
              <div className=''>
                {inner_content}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AppNavigation;
