import Navbar from './Navbar';
import Link from 'next/link';
import { getUser } from '@/services/getUser';
import { navItems } from '@/lib/navigation';

const NavbarHandler = async () => {
    const user = await getUser();
    // console.log("navbar", user);

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