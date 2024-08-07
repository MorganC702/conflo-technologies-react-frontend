import React, { useState } from 'react';
import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import NewDirectoryContactForm from '../components/NewDirectoryContactForm.component';

const companiesWithContacts = {
  "Alpha Corp": {
    legalName: "Alpha Corporation",
    businessType: "General Contractor",
    physicalAddress: "123 Alpha St, Alpha City, AC 12345",
    serviceRegions: ["California", "Nevada", "Arizona"],
    contacts: [
      { firstName: "Adam", lastName: "Bella", phone: "123-456-7800", email: "adam.bella@example.com", role: "owner", tradeCode: "electrical-001" },
      { firstName: "Charlie", lastName: "Diana", phone: "123-456-7801", email: "charlie.diana@example.com", role: "external", tradeCode: "plumbing-001" },
      { firstName: "Edward", lastName: "Fiona", phone: "123-456-7802", email: "edward.fiona@example.com", role: "external", tradeCode: "carpentry-001" },
      { firstName: "George", lastName: "Hannah", phone: "123-456-7803", email: "george.hannah@example.com", role: "external", tradeCode: "electrical-002" }
    ]
  },
  "Beta LLC": {
    legalName: "Beta Limited Liability Company",
    businessType: "Electrical Contractor",
    physicalAddress: "456 Beta Ave, Beta Town, BT 67890",
    serviceRegions: ["Texas", "Oklahoma", "Louisiana"],
    contacts: [
      { firstName: "Kyle", lastName: "Laura", phone: "123-456-7805", email: "kyle.laura@example.com", role: "owner", tradeCode: "carpentry-002" },
      { firstName: "Mason", lastName: "Nora", phone: "123-456-7806", email: "mason.nora@example.com", role: "external", tradeCode: "electrical-001" },
      { firstName: "Oliver", lastName: "Paula", phone: "123-456-7807", email: "oliver.paula@example.com", role: "external", tradeCode: "plumbing-001" },
      { firstName: "Quinn", lastName: "Rachel", phone: "123-456-7808", email: "quinn.rachel@example.com", role: "external", tradeCode: "carpentry-001" }
    ]
  },
  "Gamma Inc": {
    legalName: "Gamma Incorporated",
    businessType: "Plumbing Contractor",
    physicalAddress: "789 Gamma Blvd, Gamma City, GC 23456",
    serviceRegions: ["Florida", "Georgia", "South Carolina"],
    contacts: [
      { firstName: "Uma", lastName: "Victor", phone: "123-456-7810", email: "uma.victor@example.com", role: "owner", tradeCode: "plumbing-002" },
      { firstName: "Wendy", lastName: "Xavier", phone: "123-456-7811", email: "wendy.xavier@example.com", role: "external", tradeCode: "carpentry-002" },
      { firstName: "Yvonne", lastName: "Zach", phone: "123-456-7812", email: "yvonne.zach@example.com", role: "external", tradeCode: "electrical-001" },
      { firstName: "Adam", lastName: "Bella", phone: "123-456-7813", email: "adam.bella@example.com", role: "external", tradeCode: "plumbing-001" }
    ]
  },
  "Delta Ltd": {
    legalName: "Delta Limited",
    businessType: "Carpentry Contractor",
    physicalAddress: "101 Delta St, Delta Town, DT 34567",
    serviceRegions: ["New York", "New Jersey", "Connecticut"],
    contacts: [
      { firstName: "Edward", lastName: "Fiona", phone: "123-456-7815", email: "edward.fiona@example.com", role: "owner", tradeCode: "electrical-002" },
      { firstName: "George", lastName: "Hannah", phone: "123-456-7816", email: "george.hannah@example.com", role: "external", tradeCode: "plumbing-002" },
      { firstName: "Ian", lastName: "Jenna", phone: "123-456-7817", email: "ian.jenna@example.com", role: "external", tradeCode: "carpentry-002" },
      { firstName: "Kyle", lastName: "Laura", phone: "123-456-7818", email: "kyle.laura@example.com", role: "external", tradeCode: "electrical-001" }
    ]
  },
  "Epsilon GmbH": {
    legalName: "Epsilon GmbH",
    businessType: "HVAC Contractor",
    physicalAddress: "202 Epsilon Rd, Epsilon City, EC 45678",
    serviceRegions: ["Illinois", "Indiana", "Ohio"],
    contacts: [
      { firstName: "Oliver", lastName: "Paula", phone: "123-456-7820", email: "oliver.paula@example.com", role: "owner", tradeCode: "carpentry-001" },
      { firstName: "Quinn", lastName: "Rachel", phone: "123-456-7821", email: "quinn.rachel@example.com", role: "external", tradeCode: "electrical-002" },
      { firstName: "Steven", lastName: "Tina", phone: "123-456-7822", email: "steven.tina@example.com", role: "external", tradeCode: "plumbing-002" },
      { firstName: "Uma", lastName: "Victor", phone: "123-456-7823", email: "uma.victor@example.com", role: "external", tradeCode: "carpentry-002" }
    ]
  }
};

const internalTeam = [
  { firstName: "Ian", lastName: "Jenna", phone: "123-456-7804", email: "ian.jenna@example.com", role: "internal", tradeCode: "plumbing-002" },
  { firstName: "Mason", lastName: "Nora", phone: "123-456-7819", email: "mason.nora@example.com", role: "internal", tradeCode: "plumbing-001" },
  { firstName: "Steven", lastName: "Tina", phone: "123-456-7822", email: "steven.tina@example.com", role: "internal", tradeCode: "plumbing-002" },
  { firstName: "Wendy", lastName: "Xavier", phone: "123-456-7811", email: "wendy.xavier@example.com", role: "internal", tradeCode: "carpentry-002" },
  { firstName: "Yvonne", lastName: "Zach", phone: "123-456-7812", email: "yvonne.zach@example.com", role: "internal", tradeCode: "electrical-001" }
];

const tabs = [
  { name: 'All', href: '#', key: 'all' },
  { name: 'Internals', href: '#', key: 'internal' },
  { name: 'Owners', href: '#', key: 'owners' },
  { name: 'Subcontractors', href: '#', key: 'subcontractors' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Directory() {
  const [currentTab, setCurrentTab] = useState('all');
  const [sortKey, setSortKey] = useState('lastName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    setCurrentTab(tab.key);
  };

  const sortingOptions = [
    { key: 'lastName', label: 'Last Name' },
    { key: 'firstName', label: 'First Name' },
    { key: 'role', label: 'Role' },
    { key: 'tradeCode', label: 'Trade' },
    { key: 'company', label: 'Company Name' },
  ];

  const getAllContacts = () => {
    let contacts = Object.keys(companiesWithContacts).reduce((acc, company) => {
      return [...acc, ...companiesWithContacts[company].contacts.map(contact => ({ ...contact, company }))];
    }, []);
    contacts = [...contacts, ...internalTeam.map(contact => ({ ...contact, company: null }))];
    return contacts;
  };

  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder('asc');
    setIsDropdownOpen(false);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedUsers = [...getAllContacts()].sort((a, b) => {
    const aValue = a[sortKey]?.toString().toLowerCase();
    const bValue = b[sortKey]?.toString().toLowerCase();

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user => {
    if (currentTab === 'all') return true;
    if (currentTab === 'internal') return user.role === 'internal';
    if (currentTab === 'owners') return user.role === 'owner';
    if (currentTab === 'subcontractors') return user.role === 'external';
    return false;
  });

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 border p-4 rounded-md mb-4 shadow'>
        <div className='col-span-1 flex justify-start items-center'>
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-gray-900">Company Directory</h1>
            <p className="hidden sm:flex mt-2 text-sm text-gray-700">
              A list of all the contacts in your company.
            </p>
          </div>
        </div>

        <div className='hidden sm:flex  col-span-1 justify-end items-center'>
          <div className='rounded-md border px-4 py-2 shadow shadow-md flex items-center space-x-2'>
            <img src="https://example.com/youtube-icon.png" alt="YouTube" className="h-6 w-6"/>
            <span>TRAINING VIDEO HERE</span>
          </div>
        </div>
      </div>

      <div className='mb-5'>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            value={currentTab}
            onChange={(e) => handleTabClick(tabs.find(tab => tab.key === e.target.value))}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {tabs.map((tab) => (
              <option key={tab.name} value={tab.key}>{tab.name}</option>
            ))}
          </select>
        </div>
        
        <div className="hidden sm:block">
          <div className="border-b">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={() => handleTabClick(tab)}
                  aria-current={currentTab === tab.key ? 'page' : undefined}
                  className={classNames(
                    currentTab === tab.key
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="border rounded-md shadow">
        <div className='px-6 pt-6'>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              {/* padding for left hand side  */}
            </div>
            
            <div className="mt-3 sm:ml-4 sm:mt-0 relative">
              <label htmlFor="mobile-search-candidate" className="sr-only">Search</label>
              <label htmlFor="desktop-search-candidate" className="sr-only">Search</label>
              
              <div className="flex rounded-md shadow-sm border sm:border-none">
                <div className="relative flex-grow focus-within:z-10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                    <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobile-search-candidate"
                    name="mobile-search-candidate"
                    type="text"
                    placeholder="Search"
                    className="block w-full rounded-md border-0 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                  />
                  <input
                    id="desktop-search-candidate"
                    name="desktop-search-candidate"
                    type="text"
                    placeholder="Search candidates"
                    className="hidden w-full rounded-none rounded-l-md border-gray-300 py-1.5 pl-10 text-sm leading-6 text-gray-900 border-t border-b placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                  />
                </div>
                <div className="hidden sm:flex relative items-center">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 border-gray-300 border-t border-b hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <BarsArrowUpIcon aria-hidden="true" className="hidden md:flex mx-1 h-5 w-5 text-gray-400" />
                    {sortingOptions.find(option => option.key === sortKey)?.label}
                    <ChevronDownIcon aria-hidden="true" className=" pl-1 -mr-1 h-5 w-5 text-gray-400" />
                  </button>

                  <button
                    type="button"
                    className="relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 border-gray-300 border hover:bg-gray-50"
                    onClick={toggleSortOrder}
                  >
                    {sortOrder === 'asc' ? 'A-Z ▲' : 'Z-A ▼'}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 z-30 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{top: '100%'}}>
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {sortingOptions.map(option => (
                          <button
                          key={option.key}
                          onClick={() => {
                            handleSort(option.key);
                            setIsDropdownOpen(false); // Close the dropdown after selecting an option
                          }}
                          className={`block w-full px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-gray-900 ${sortKey === option.key ? 'bg-gray-100' : ''}`}
                          role="menuitem"
                        >
                          {option.label}
                        </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex my-6 sm:my-0 ml-4">
            <div className="flex-auto"> 
              {/* padding for left hand side  */}
            </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsModalOpen(true)}
              >
                Add contact
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flow-root border-t pb-6">
          <div className="align-middle inline-block min-w-full">
            <div className="overflow-auto" style={{ maxHeight: '550px' }}>
              <table className="min-w-full">
                <thead className="bg-gray-50 sticky top-0 z-20">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer"
                      // onClick={() => handleSort('firstName')}
                    >
                      Full Name
                      {sortKey === 'firstName' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                      {sortKey === 'lastName' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hidden sm:table-cell"
                      // onClick={() => handleSort('role')}
                    >
                      Role / Trade
                      {sortKey === 'role' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hidden sm:table-cell"
                      // onClick={() => handleSort('email')}
                    >
                      Phone / Email
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hidden md:table-cell"
                      // onClick={() => handleSort('company')}
                    >
                      Company
                      {sortKey === 'company' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th scope="col" className="relative py-3.5 ">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {filteredUsers.map((user, idx) => (
                    <tr key={idx} >
                      <td className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {user.role} <br />
                        {user.tradeCode}
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {user.phone} <br />
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-500 hidden md:table-cell ">{user.company || 'N/A'}</td>
                      <td className="whitespace-nowrap pr-4 py-4 text-center text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Manage</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <NewDirectoryContactForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} companies={Object.keys(companiesWithContacts)} />
    </>
  );
}
