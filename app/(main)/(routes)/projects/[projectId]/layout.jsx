import { Open_Sans } from 'next/font/google';
import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { getProject } from '@/models/projects';
import { getClients } from '@/models/clients';
import ProjectHeader from '@/components/ux/projects/project/ProjectHeader';
import NotFound from '@/components/ux/404/NotFound';

config.autoAddCss = false;

const font = Open_Sans({ subsets: ['latin'] })

export const metadata = {
    title: 'Construction Company',
    description: 'Construction, and proyects managments',
}

export default async function ProjectLayout({ children, params }) {

    const project = await getProject(params.projectId);
    const clients = await getClients();
    if (!project.id) {
        return (
            <NotFound />
        );
    }
    return (

        <>
            <ProjectHeader
                project={project}
                clients={clients}

            />
            {children}
        </>

    )
}



