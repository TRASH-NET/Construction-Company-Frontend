export const getEmployees = async () => {
	const respuesta = await fetch(`${process.env.API_URL}/employees/`, { cache: 'no-store' });
	const resultado = await respuesta.json();

	return resultado;
}

export const postEmployee = async (employee) => {

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'accept': 'application/json'
		},
		body: JSON.stringify(employee)
	});

	if (response.status === 201) {

		const newEmployee = await response.json();

		return newEmployee;
	} else {

		throw new Error('No se pudo crear el empleado');
	}
};

export const editEmployee = async (id, employee) => {

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'accept': 'application/json'
		},
		body: JSON.stringify(employee)
	});

	if (response.status === 200) {

		const employeeEdited = await response.json();

		return employeeEdited;
	} else {
		throw new Error('No se pudo editar el empleado');
	}
};

export const deleteEmployee = async (id) => {

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`, {
		method: 'DELETE',
	});

	if (response.status === 200) {

		const employeeDeleted = await response.json();

		return employeeDeleted;
	} else {
		throw new Error('No se pudo eliminar el empleado');
	}
};