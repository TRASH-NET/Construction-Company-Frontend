import ProjectContainer from '@/components/ux/projects/project/ProjectContainer'
import { getClients } from '@/models/clients';
import { getProject } from '@/models/projects';


export default async function Project({ params }) {

	const project = await getProject(params.projectId);
	const clients = await getClients();

	return (
		<ProjectContainer
			project={project}
			clients={clients}
		/>
	);
}
