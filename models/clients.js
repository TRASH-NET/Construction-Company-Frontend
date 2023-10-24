export const getClients = async () => {
    const respuesta = await fetch(`${process.env.API_URL}/clients/`, { cache: 'no-store' });
    const resultado = await respuesta.json();

    return resultado;
}

export const postClient = async (client) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(client)
    });

    if (response.status === 201) {

        const newClient = await response.json();

        return newClient;
    } else {

        throw new Error('No se pudo crear el client');
    }
};

export const editClient = async (id, client) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(client)
    });

    if (response.status === 200) {

        const clientEdited = await response.json();

        return clientEdited;
    } else {
        throw new Error('No se pudo editar el client');
    }
};

export const deleteclient = async (id) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${id}`, {
        method: 'DELETE',
    });

    if (response.status === 200) {

        const clientDeleted = await response.json();

        return clientDeleted;
    } else {
        throw new Error('No se pudo eliminar el client');
    }
};