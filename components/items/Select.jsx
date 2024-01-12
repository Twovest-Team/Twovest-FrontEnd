'use client'

import { Listbox } from '@headlessui/react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Select = ({data, state, setState, defaultValue}) => {

    return (
        <>
            <Listbox value={state} onChange={setState}>
                {({ open }) => (
                    <div>
                        <Listbox.Button className={`bg-white py-4 px-6 w-full ${open ? 'border-x border-t rounded-t' : 'border rounded'} border-grey flex justify-between`}>
                            <span className='truncate'>{state ? state.name : defaultValue}</span>
                            <div className='flex-grow flex justify-end'>
                                <KeyboardArrowDownIcon className={open ? 'rotate-180' : 'rotate-0'} />
                            </div>
                        </Listbox.Button>

                        <Listbox.Options className={'bg-white border border-grey  flex flex-col max-h-48 h-full overflow-y-scroll rounded-b'}>
                            {data.map((person) => (
                                <Listbox.Option
                                    className={({ active }) =>
                                        `py-3 px-6 ${person.unavailable ? 'hidden' : 'cursor-pointer'} ${active && 'bg-grey_opacity_50'
                                        }`}
                                    key={person.id}
                                    value={person}
                                    disabled={person.unavailable}
                                >
                                    <span className={person.unavailable && 'opacity-30'}>{person.name}</span>
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                )}
            </Listbox>
        </>
    )
}

export default Select