import React, { MouseEvent } from 'react';

import Link from 'next/link';

import { useAppDispatch } from '@/hooks';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

export default function SiteLinks() {
  const dispatch = useAppDispatch();

  const handleClose = (e: MouseEvent<HTMLAnchorElement>) => {
    window.scrollTo(0, 0);
    dispatch({ type: 'NAVIGATION_CLOSE' });
  };

  return (
    <div className='SiteLinks'>
      <div className='SiteLinks-logo'>
        <Link href={{ pathname: '/' }}>
          <a onClick={handleClose}>
            <img
              className='SiteLinks-logo-image'
              src={`${imagesUrl}/Logo.png`}
              alt='Aquaeconomics Logo'
            />
          </a>
        </Link>
      </div>
      <div className='SiteLinks-navigation'>
        <div className='SiteLinks-navigation-column'>
          <ul>
            <li className='is-big'>
              <Link href={{ pathname: '/civil_engineering' }}>
                <a>Site Civil Engineering</a>
              </Link>
            </li>
            <li>
              <Link href={{ pathname: '/site_design' }}>
                <a>Site Planning &amp; Design</a>
              </Link>
            </li>
            <li>
              <Link href={{ pathname: '/water_resources' }}>
                <a>Water Resources</a>
              </Link>
            </li>
            <li>
              <Link href={{ pathname: '/stormwater' }}>
                <a>Stormwater Bill Analysis</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='SiteLinks-navigation-column'>
          <ul>
            <li className='is-big'>
              <Link href={{ pathname: '/surveying' }}>
                <a>Land Surveying</a>
              </Link>
            </li>
            <li className='is-big'>
              <Link href={{ pathname: '/consulting' }}>
                <a>Consulting</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='SiteLinks-navigation-column'>
          <ul>
            <li className='is-big'>
              <Link href={{ pathname: '/company'}}>
                <a>Company</a>
              </Link>
            </li>
            <li>
              <Link href={{ pathname: '/portfolio' }}>
                <a>Portfolio</a>
              </Link>
            </li>
            <li>
              <Link href={{ pathname: '/partners' }}>
                <a>Partners</a>
              </Link>
            </li>
            <li>
              <Link href={{ pathname: '/careers' }}>
                <a>Careers</a>
              </Link>
            </li>
            <li>
              <Link href={{ pathname: '/contact' }}>
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
