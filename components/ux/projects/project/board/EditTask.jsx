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
import { editSchedule } from "@/models/schedules";
import { useEffect } from "react";

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
    state: z.string(),
    employee_id: z.any().nullable().transform(value => {
        if (value === null) {
            return null;
        } else {
            const parsedValue = parseInt(value);
            return parsedValue;
        }
    })
});

export default function EditTask({ schedule, employees, setModalEdit }) {

    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    const matchEmployeeName = (employeesData, scheduleData) => {
        const matching = employeesData?.find(employeeData => employeeData.id === scheduleData);
        return matching ? matching?.name : "Unassigned";
    }

    const onSubmit = async (schedule_data) => {

        schedule_data.start_date = null
        schedule_data.project_id = null

        try {
            await editSchedule(schedule.id, schedule_data);
            location.reload();
        } catch (error) {
            console.error('Error al crear el schedule:', error);
        }

    };

    useEffect(() => {
        if (Object.keys(schedule).length > 0) {
            form.setValue('id', schedule.id)
            form.setValue('name', schedule.name)
            form.setValue('description', schedule.description);
            form.setValue('finish_date', schedule.finish_date);
            form.setValue('priority', schedule.priority);
            form.setValue('state', schedule.state)
            form.setValue('employee_id', schedule.employee_id);
        }
    }, []);

    const handleCloseModal = () => {
        setModalEdit(false);
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
                                            placeholder="Name" {...field}
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
                                            {...field}
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
                                        <Input placeholder="Task Finish Date" type="date" {...field} />
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
                                                <SelectValue placeholder={(() => {
                                                    if (field.value == 1) {
                                                        return "High";
                                                    } else if (field.value == 2) {
                                                        return "Medium";
                                                    } else if (field.value == 3) {
                                                        return "Low";
                                                    } else {
                                                        return "Select";
                                                    }
                                                })()} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">High</SelectItem>
                                                <SelectItem value="2">Medium</SelectItem>
                                                <SelectItem value="3">Low</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={field.value} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">New</SelectItem>
                                                <SelectItem value="in progress">In Progress</SelectItem>
                                                <SelectItem value="in review">In Review</SelectItem>
                                                <SelectItem value="done">Done</SelectItem>
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
                                                <SelectValue placeholder={matchEmployeeName(employees, schedule.employee_id)} />
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

                        <Button type="submit" variant="modal">Edit Task</Button>
                    </form>
                </Form>
            </div>

        </div>


    );
}
