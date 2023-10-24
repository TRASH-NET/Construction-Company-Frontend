export const getEquipments = async () => {
    const respuesta = await fetch(`${process.env.API_URL}/equipments/`, { cache: 'no-store' });
    const resultado = await respuesta.json();

    return resultado;
}

export const postEquipment = async (equipment) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(equipment)
    });

    if (response.status === 201) {

        const newEquipment = await response.json();

        return newEquipment;
    } else {

        throw new Error('No se pudo crear el equipment');
    }
};

export const editEquipment = async (id, equipment) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(equipment)
    });

    if (response.status === 200) {

        const equipmentEdited = await response.json();

        return equipmentEdited;
    } else {
        throw new Error('No se pudo editar el equipment');
    }
};

export const deleteEquipment = async (id) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipments/${id}`, {
        method: 'DELETE',
    });

    if (response.status === 200) {

        const equipmentDeleted = await response.json();

        return equipmentDeleted;
    } else {
        throw new Error('No se pudo eliminar el equipment');
    }
};