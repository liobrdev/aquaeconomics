import { MouseEvent } from 'react';

import { useAppDispatch } from '@/hooks';

import { MenuIcon } from './';


export default function NavigationIcon() {
  const dispatch = useAppDispatch();

  const handleShow = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: 'NAVIGATION_SHOW' });
  };

  return (
    <div className='NavigationMain'> 
      <div className='MenuIcon-container'>
        <MenuIcon onClick={handleShow} type='button' />
      </div>
    </div>
  );
}
