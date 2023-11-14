import Image from "next/image";

const Home = async () => {

	return (
		<main className='flex flex-col justify-center items-center border-4 w-full p-9 font-bold text-xl'>
			<h2>DASHBOARD</h2>
			<Image
				src={'https://www.ucundinamarca.edu.co/images/ucundinamarca/mantenimiento.png'} width={719} height={414}
				className="image-prueba"
			/>
		</main>
	)
}

export default Home