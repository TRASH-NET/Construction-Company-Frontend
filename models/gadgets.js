export const getGadgets = async () => {
    const respuesta = await fetch(`${process.env.API_URL}/gadgets/`, { cache: 'no-store' });
    const resultado = await respuesta.json();

    return resultado;
}

export const postGadget = async (gadget) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gadgets/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(gadget)
    });

    if (response.status === 201) {

        const newGadget = await response.json();

        return newGadget;
    } else {

        throw new Error('No se pudo crear el gadget');
    }
};

export const editGadget = async (id, gadget) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gadgets/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(gadget)
    });

    if (response.status === 200) {

        const gadgetEdited = await response.json();

        return gadgetEdited;
    } else {
        throw new Error('No se pudo editar el gadget');
    }
};

export const deleteGadget = async (id) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gadgets/${id}`, {
        method: 'DELETE',
    });

    if (response.status === 200) {

        const employeeDeleted = await response.json();

        return employeeDeleted;
    } else {
        throw new Error('No se pudo eliminar el gadget');
    }
};