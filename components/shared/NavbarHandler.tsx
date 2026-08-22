import React from 'react';
import Navbar from './Navbar';
import { navItems } from '@/lib/navigation';
import Link from 'next/link';

const NavbarHandler = async () => {
    const user = { success: false }

    return (
        <div className='border-b border-primary'>
            <Navbar user={ user }/>
            
            {/* Nav Links */}
          <div className="md:hidden flex justify-center items-center gap-8 pb-3">

            {navItems.map((item) => (
              <Link key={item.href} href={item.href}
                className=" hover:text-primary hover:shadow hover:shadow-primary text-sm font-medium"> {item.label}  </Link>
            ))}

          </div>
        </div>
    );
};

export default NavbarHandler;