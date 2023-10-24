import Image from "next/image";

const Equipments = () => {
    return (
        <main className='flex flex-col justify-center items-center border-4 w-full p-9 font-bold text-xl'>
            <h2>Equipments</h2>
            <Image
                src={'https://www.ucundinamarca.edu.co/images/ucundinamarca/mantenimiento.png'} width={719} height={414}
                className="image-prueba"
            />
        </main>
    )
}

export default Equipments;