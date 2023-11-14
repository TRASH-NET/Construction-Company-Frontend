export const getSchedules = async () => {
    const respuesta = await fetch(`${process.env.API_URL}/schedules/`, { cache: 'no-store' });
    const resultado = await respuesta.json();

    return resultado;
}

export const getSchedule = async (id) => {
    const respuesta = await fetch(`${process.env.API_URL}/schedules/${id}`, { cache: 'no-store' });
    const resultado = await respuesta.json();

    return resultado;
}

export const postSchedule = async (schedule) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(schedule)
    });

    if (response.status === 201) {

        const newSchedule = await response.json();

        return newSchedule;
    } else {

        throw new Error('No se pudo crear el schedule');
    }
};

export const editSchedule = async (id, schedule) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(schedule)
    });

    if (response.status === 200) {

        const scheduleEdited = await response.json();

        return scheduleEdited;
    } else {
        throw new Error('No se pudo editar el schedule');
    }
};

export const deleteSchedule = async (id) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/${id}`, {
        method: 'DELETE',
    });

    if (response.status === 200) {

        const scheduleDeleted = await response.json();

        return scheduleDeleted;
    } else {
        throw new Error('No se pudo eliminar el schedule');
    }
};