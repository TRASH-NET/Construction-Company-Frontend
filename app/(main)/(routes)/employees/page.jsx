
import EmployeesContainer from '@/components/ux/employees/EmployeesContainer';
import { getEmployees } from '@/models/employees';



export default async function Employees() {

	const employees = await getEmployees();

	return (
		<main className=' w-full h-screen p-9 font-bold text-xl'>
			<h2 className='mb-5'>Employees</h2>
			<EmployeesContainer
				employees={employees}
			/>
		</main>
	)
}




