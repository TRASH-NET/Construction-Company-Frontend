
import { getClients } from '@/models/clients';
import ClientsContainer from '@/components/ux/clients/ClientsContainer';


export default async function Clients() {

    const clients = await getClients();

    return (
        <main className=' w-full h-screen p-9 font-bold text-xl'>
            <h2 className='mb-5'>Clients</h2>
            <ClientsContainer
                clients={clients}
            />
        </main>
    )
}
