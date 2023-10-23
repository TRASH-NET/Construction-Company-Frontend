"use client"

import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { faCalendarDays, faChartLine, faClipboard, faToolbox, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Separator } from "@/components/ui/separator"




const navLinks = [
    {
        name: 'Dashboard',
        href: '/',
        icon: <FontAwesomeIcon icon={faChartLine} />
    },
    {
        name: 'Projects',
        href: '/projects',
        icon: <FontAwesomeIcon icon={faClipboard} />
    },
    {
        name: 'Gadgets',
        href: '/gadgets',
        icon: <FontAwesomeIcon icon={faToolbox} />
    },
    {
        name: 'Employees',
        href: '/employees',
        icon: <FontAwesomeIcon icon={faUsers} />
    },
    {
        name: 'Schedule',
        href: '/schedule',
        icon: <FontAwesomeIcon icon={faCalendarDays} />
    }
]


const Navbar = () => {

    const pathname = usePathname()

    return (
        <nav className='w-1/6 min-w-fit h-screen '>
            <h1 className='text-2xl font-bold text-center py-6 mt-4 uppercase'>Construction <span className='block'>Company</span></h1>
            <div className='flex flex-col justify-left items-center'>
                {
                    navLinks.map(({ name, href, icon }) => (
                        <Link
                            key={href}
                            href={href}
                            icon={icon}
                            className={pathname === href ? 'navBar__item-active' : 'navBar__item'}
                        >
                            <div className='navBar__info'>
                                <span className='mr-2'>{icon}</span>
                                <p>{name}</p>
                            </div>

                        </Link>
                    ))
                }
                <Separator
                    className='mt-3'
                />
                <div className='mt-7'>
                    <UserButton
                        afterSignOutUrl='/'
                        showName={true}
                    />
                </div>
            </div>


        </nav>
    )
}

export default Navbar