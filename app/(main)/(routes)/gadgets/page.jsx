
import GadgetsContainer from '@/components/ux/gadgets/GadgetsContainer';
import { getGadgets } from "@/models/gadgets";
import { getProject } from '@/models/projects';
import { getSchedule, getSchedules } from '@/models/schedules';




export default async function Gadgets() {

	const gadgets = await getGadgets();
	const schedules = await getSchedules();
	const projectInfo = await Promise.all(
		gadgets.map(async (gadget) => {
			if (gadget.schedule_id) {
				const schedule = await getSchedule(gadget.schedule_id);
				const project = await getProject(schedule.project_id);
				return project;
			} else {
				return {}
			}
		})
	);

	return (
		<main className=' w-full h-screen p-9 font-bold text-xl'>
			<h2 className='mb-5'>Gadgets</h2>
			<GadgetsContainer
				gadgets={gadgets}
				schedules={schedules}
				projectInfo={projectInfo}
			/>
		</main>
	)
}