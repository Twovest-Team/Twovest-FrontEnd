import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';

const NotificationNumber = ({ number }) => {

  const [show, setShow] = useState(false);

  useEffect(() => setShow(true), [])

  return (
    <Transition
      className='w-full'
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >

      <div className="w-5 h-5 bg-black duration-200 text-white text-caption rounded-full flex items-center justify-center absolute top-3.5 left-3">
        <span className="translate-x-[0.5px]">{number}</span>
      </div>
    </Transition>

  );
};

export default NotificationNumber;
