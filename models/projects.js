export const getProjects = async () => {
    const respuesta = await fetch(`${process.env.API_URL}/projects/`, { cache: 'no-store' });
    const resultado = await respuesta.json();

    return resultado;
}

export const getProject = async (id) => {
    const respuesta = await fetch(`${process.env.API_URL}/projects/${id}`, { cache: 'no-store' });
    const resultado = await respuesta.json();

    return resultado;
}

export const postProject = async (project) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(project)
    });

    if (response.status === 200) {

        const newproject = await response.json();

        return newproject;
    } else {

        throw new Error('No se pudo crear el project');
    }
};

export const editProject = async (id, project) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(project)
    });

    if (response.status === 200) {

        const projectEdited = await response.json();

        return projectEdited;
    } else {
        throw new Error('No se pudo editar el project');
    }
};

export const deleteProject = async (id) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
        method: 'DELETE',
    });

    if (response.status === 200) {

        const projectDeleted = await response.json();

        return projectDeleted;
    } else {
        throw new Error('No se pudo eliminar el project');
    }
};