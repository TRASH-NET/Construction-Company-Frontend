import { Open_Sans } from 'next/font/google';
import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const font = Open_Sans({ subsets: ['latin'] })

export const metadata = {
    title: 'Construction Company',
    description: 'Construction, and proyects managments',
}

export default function ProjectsLayout({ children }) {
    return (
        <main className='h-screen p-9 font-bold text-xl projects-container min-w-[768px]'>
            {children}
        </main>
    )
}
