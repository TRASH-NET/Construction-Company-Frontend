import TeamWorkContainer from '@/components/ux/projects/project/teamwork/TeamWorkContainer';
import { getEmployees } from '@/models/employees';
import { getProject } from '@/models/projects';

const TeamWork = async ({ params }) => {

    const project = await getProject(params.projectId);
    const allEmployees = await getEmployees();
    const schedules = project.schedule_id;

    const employeeIds = schedules.map((schedule) => schedule.employee_id);
    const uniqueEmployeeIdsSet = new Set(employeeIds);
    const uniqueEmployeeIdsArray = Array.from(uniqueEmployeeIdsSet);

    const matchEmployeeData = (employeesData, employeesIds) => {
        return employeesIds.map((employeeIds) => {
            const matchingEmployee = employeesData.find((employee) => employee.id === employeeIds);
            return matchingEmployee;
        })
    }

    const employees = matchEmployeeData(allEmployees, uniqueEmployeeIdsArray);

    return (
        <TeamWorkContainer
            employees={employees}
        />
    )
}

export default TeamWork