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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { postSchedule } from "@/models/schedules";

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Name's project is required to be created.",
    }).max(30, {
        message: "Name's project must contain at most 30 character(s)"
    }),
    description: z.string().min(1, {
        message: "Description's project is required to be created",
    }).max(200, {
        message: "Description's project must contain at most 200 character(s)"
    }),
    finish_date: z.string().transform(value => {

        return z.string().parse(value.toString());
    }),
    priority: z.any().transform((value) => {
        const numericValue = parseInt(value);
        return numericValue;
    }),
    employee_id: z.string().nullable().transform(value => {
        if (value === null) {
            return null;
        } else {
            const parsedValue = parseInt(value);
            return parsedValue;
        }
    })
});

export default function CreateTask({ project, employees, setModalCreate }) {

    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (schedule) => {

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        schedule.start_date = formattedDate;
        schedule.project_id = project.id;
        schedule.state = 'new';

        try {
            await postSchedule(schedule);
            location.reload();
        } catch (error) {
            console.error('Error al crear el schedule:', error);
        }

    };

    const handleCloseModal = () => {
        setModalCreate(false);
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
                                    <FormLabel>Name</FormLabel>
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Description"
                                            className="resize-none"
                                            {...field} value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="finish_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Finish Date</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Task Finish Date" type="date" {...field} value={field.value || new Date()} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1"><p>High</p></SelectItem>
                                                <SelectItem value="2"><p>Medium</p></SelectItem>
                                                <SelectItem value="3"><p>Low</p></SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="employee_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assign to</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={null}>N/A</SelectItem>
                                                {employees.map(employee => (
                                                    <SelectItem key={employee.id} value={employee.id.toString()} className="flex justify-between items-center gap-2">
                                                        <p>{employee.name}</p>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" variant="modal">Create Task</Button>
                    </form>
                </Form>
            </div>

        </div>


    );
}
