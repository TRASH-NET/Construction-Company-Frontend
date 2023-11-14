"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postEmployee } from "@/models/employees";

const FormSchema = z.object({
	name: z.string().min(1, {
		message: "Name's employee is required to be added on employees's list.",
	}).max(30, {
		message: "Name's employee must contain at most 30 character(s)"
	}),
	last_name: z.string().min(1, {
		message: "Last Name's employee is required to be added on employees's list.",
	}).max(30, {
		message: "Last Name's employee must contain at most 30 character(s)"
	}),
	phone: z.string().refine(value => {
		const phoneRegex = /^\+\d{1,4} \d{10}$/;
		return phoneRegex.test(value);
	}, {
		message: "Phone's employee must contain '+' symbol plus are code, then an space plus 10 digits of phone number like '+57 3013226756'",
	}),
	mail: z.string().max(40, {
		message: "Mail's employee must contain at most 30 character(s)"
	}).refine(value => {
		const phoneRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
		return phoneRegex.test(value);
	}, {
		message: "Please insert a valid email",
	}),
	type: z.string().min(1, {
		message: "Employee type is required to be added on employees's list.",
	}).max(30, {
		message: "Employee type must contain at most 30 character(s)"
	}),
});

export default function CreateEmployee({ setModal }) {

	const form = useForm({
		resolver: zodResolver(FormSchema),
	});

	const onSubmit = async (employee) => {
		try {
			await postEmployee(employee);
			location.reload();
		} catch (error) {
			console.error('Error al crear el empleado:', error);
		}

	};

	const handleCloseModal = () => {
		setModal(false);
	}


	return (
		<div className="absolute inset-0 bg-black bg-opacity-80 z-20 flex justify-center items-center h-screen">
			<div className="modalInside">
				<div className="hover: cursor-pointer self-end mr-5 mt-5" onClick={handleCloseModal}>
					<FontAwesomeIcon icon={faXmark} />
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Employee's Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Name" {...field} value={field.value || ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Employee's Last Name</FormLabel>
									<FormControl>
										<Input placeholder="Last Name" {...field} value={field.value || ''} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Employee's Phone</FormLabel>
									<FormControl>
										<Input placeholder="Phone" {...field} value={field.value || ''} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="mail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Employee's Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} value={field.value || ''} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Employee Type</FormLabel>
									<FormControl>
										<Input placeholder="Type" {...field} value={field.value || ''} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" variant="modal">Add New Employee</Button>
					</form>
				</Form>
			</div>

		</div>


	);
}
