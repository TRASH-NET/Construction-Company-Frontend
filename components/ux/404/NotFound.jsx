import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className='col-span-full row-span-full m-auto flex flex-col gap-2 justify-center items-center'>
            <h2 className='text-xl text-center'>404 Not Found</h2>
            <p>This project doesn't exist</p>
            <Link href="/projects"><Button>Go back projects</Button></Link>
        </div>
    )
}

export default NotFound