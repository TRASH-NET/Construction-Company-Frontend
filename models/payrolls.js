export const getPayrolls = async () => {
    const respuesta = await fetch(`${process.env.API_URL}/payrolls/`, { cache: 'no-store' });
    const resultado = await respuesta.json();

    return resultado;
}

export const postPayroll = async (payroll) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payrolls/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(payroll)
    });

    if (response.status === 201) {

        const newPayroll = await response.json();

        return newPayroll;
    } else {

        throw new Error('No se pudo crear el payroll');
    }
};

export const editPayroll = async (id, payroll) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payrolls/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(payroll)
    });

    if (response.status === 200) {

        const payrollEdited = await response.json();

        return payrollEdited;
    } else {
        throw new Error('No se pudo editar el payroll');
    }
};

export const deletePayroll = async (id) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payrolls/${id}`, {
        method: 'DELETE',
    });

    if (response.status === 200) {

        const payrollDeleted = await response.json();

        return payrollDeleted;
    } else {
        throw new Error('No se pudo eliminar el payroll');
    }
};