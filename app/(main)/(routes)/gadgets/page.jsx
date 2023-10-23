
import GadgetsContainer from '@/components/ux/gadgets/GadgetsContainer';
import { getGadgets } from "@/models/gadgets";




export default async function Gadgets() {

	const gadgets = await getGadgets();

	return (
		<main className=' w-full h-screen p-9 font-bold text-xl'>
			<h2 className='mb-5'>Gadgets</h2>
			<GadgetsContainer
				gadgets={gadgets}
			/>
		</main>
	)
}