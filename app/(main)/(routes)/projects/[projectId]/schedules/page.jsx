import SchedulesContainer from '@/components/ux/projects/project/schedules/SchedulesContainer';
import { getEmployees } from '@/models/employees';
import { getProject } from '@/models/projects';

const Schedules = async ({ params }) => {

    const project = await getProject(params.projectId);
    const employees = await getEmployees();
    const schedules = project.schedule_id;
    return (
        <SchedulesContainer
            employees={employees}
            schedules={schedules}
        />
    )
}

export default Schedules