import EquipmentContainer from '@/components/ux/projects/project/equipments/EquipmentContainer'
import { getProject } from '@/models/projects';

const Equipments = async ({ params }) => {

    const project = await getProject(params.projectId);
    const schedules = project.schedule_id;
    const gadgets = schedules.flatMap(gadget => gadget.gadgets)

    return (
        <EquipmentContainer
            gadgets={gadgets}
            schedules={schedules}
        />
    )
}

export default Equipments