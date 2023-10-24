import ProjectsContainer from '@/components/ux/projects/ProjectsContainer';
import { getClients } from '@/models/clients';
import { getEquipments } from '@/models/equipments';
import { getPayrolls } from '@/models/payrolls';
import { getProjects } from '@/models/projects';
import { getSchedules } from '@/models/schedules';

export default async function Projects() {

	const projectsData = await getProjects();
	const payrollsData = await getPayrolls();
	const equipmentsData = await getEquipments();
	const clientsData = await getClients();
	const schedulesData = await getSchedules();

	const [projects, payrolls, equipments, clients, schedules] = await Promise.all([projectsData, payrollsData, equipmentsData, clientsData, schedulesData]);

	return (
		<main className=' w-full h-screen p-9 font-bold text-xl'>
			<h2 className='mb-5'>Projects</h2>
			<ProjectsContainer
				projects={projects}
				payrolls={payrolls}
				equipments={equipments}
				clients={clients}
				schedules={schedules}
			/>
		</main>
	)
}