"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { postProject } from "@/models/projects";


const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Name's gadget is required to be added on gadget's list.",
    }),
    type: z.string({
        required_error: "Type's gadget is required to added on gadget's list.",
    }),
    state: z.string({
        required_error: "State's gadget is required to added on gadget's list.",
    })

});

export default function CreateProject({ setModal, payrolls }) {


    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (project) => {
        try {
            const projectPosted = await postProject(project);
            location.reload();
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-4/5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project's Name</FormLabel>
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
                                    <FormLabel>Project's Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Description" {...field}
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
                                    <FormLabel>Project's budget</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Budget" {...field}
                                        />
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
                                    <FormLabel>Project's Payroll</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={null}>No asignado</SelectItem>
                                                {
                                                    payrolls.map(payroll => (
                                                        <SelectItem key={payroll.id} value={payroll.name}>{payroll.name}</SelectItem>
                                                    ))
                                                }
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
                                    <FormLabel>Gadget's State</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Avaible">Avaible</SelectItem>
                                                <SelectItem value="Occupied">Occupied</SelectItem>
                                                <SelectItem value="In Maintenance">In Maintenance</SelectItem>
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