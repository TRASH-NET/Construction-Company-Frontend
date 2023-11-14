import BoardContainer from '@/components/ux/projects/project/board/BoardContainer';
import { getEmployees } from '@/models/employees';
import { getProject } from '@/models/projects';

const Board = async ({ params }) => {

    const projectData = await getProject(params.projectId);
    const employeesData = await getEmployees();
    const [project, employees] = await Promise.all([projectData, employeesData]);


    return (
        <BoardContainer
            project={project}
            employees={employees}
        />
    )
}

export default Board