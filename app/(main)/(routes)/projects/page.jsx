import { getProjects } from "@/models/projects"
import ProjectsContainer from "@/components/ux/projects/ProjectsContainer";
import { getClients } from "@/models/clients";

export default async function Projects() {

	const projectsData = await getProjects();
	const clientsData = await getClients();
	const [projects, clients] = await Promise.all([projectsData, clientsData]);

	return (
		<ProjectsContainer
			projects={projects}
			clients={clients}
		/>

	)
}