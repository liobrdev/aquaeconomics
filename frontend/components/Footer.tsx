import Link from 'next/link';

import { SiteLinks } from '@/components';


export default function Footer() {
  return (
    <footer className='Footer Footer-home'>
      <SiteLinks />
      <div className='FooterLinks'>
        <span>&copy; 2022</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href={{ pathname: '/privacy' }}>
          <a className='FooterLink FooterLink--privacy'>
            Privacy Policy
          </a>
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href={{ pathname: '/terms' }}>
          <a className='FooterLink FooterLink--terms'>
            Terms and Conditions
          </a>
        </Link>
      </div>
    </footer>
  );
}