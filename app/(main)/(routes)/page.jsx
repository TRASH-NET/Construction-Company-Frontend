import { getEmployees } from "@/models/employees";
import { getEquipments } from "@/models/equipments";
import { getGadgets } from "@/models/gadgets";
import { getProjects } from "@/models/projects";
import Image from "next/image";

const Home = async () => {

	const projectsData = await getProjects();
	const equipmentsData = await getEquipments();
	const gadgetsData = await getGadgets();
	const employeesData = await getEmployees();

	const [projects, equipments, gadgets, employees] = await Promise.all([projectsData, equipmentsData, gadgetsData, employeesData]);


	return (
		<>
			<main className='flex flex-col justify-center items-center border-4 w-full p-9 font-bold text-xl'>
				<h2>DASHBOARD</h2>
				<Image
					src={'https://www.ucundinamarca.edu.co/images/ucundinamarca/mantenimiento.png'} width={719} height={414}
					className="image-prueba"
				/>
			</main>
		</>
	)
}

export default Home