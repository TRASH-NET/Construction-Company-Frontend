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
import { postProject } from "@/models/projects";

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
    budget: z.string().transform(value => {
        const parsedValue = parseInt(value);
        return parsedValue;
    }),
    finish_date: z.string().transform(value => {

        return z.string().parse(value.toString());
    }),
    client_id: z.string().nullable().transform(value => {
        if (value === null) {
            return null;
        } else {
            const parsedValue = parseInt(value);
            return parsedValue;
        }
    })
});

export default function CreateProject({ setModal, clients }) {

    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (project) => {

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        project.start_date = formattedDate;

        try {
            await postProject(project);
            location.reload();
        } catch (error) {
            console.error('Error al crear el projecto:', error);
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
                                    <FormLabel>Project's Name</FormLabel>
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
                                            placeholder="Project Description"
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
                            name="budget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Budget</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Project Budget" type="number" {...field} value={field.value || 0} />
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
                                        <Input placeholder="Project Finish Date" type="date" {...field} value={field.value || new Date()} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="client_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Owner</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={null}>N/A</SelectItem>
                                                {clients.map(client => (
                                                    <SelectItem key={client.id} value={client.id.toString()} className="flex justify-between items-center gap-2">
                                                        <p>{client.name}</p>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" variant="modal">Create Project</Button>
                    </form>
                </Form>
            </div>

        </div>


    );
}
