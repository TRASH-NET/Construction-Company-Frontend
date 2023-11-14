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
import { editClient } from "@/models/clients";
import { useEffect } from "react";

const FormSchema = z.object({
    id: z.number().min(0),
    name: z.string().min(1, {
        message: "Name's clients is required to be added on clients's list.",
    }),
    last_name: z.string().min(1, {
        message: "Last Name's clients is required to be added on clients's list.",
    }),
    phone: z.string().refine(value => {
        const phoneRegex = /^\+\d{1,4} \d{10}$/;
        return phoneRegex.test(value);
    }, {
        message: "Phone's client must contain '+' symbol plus are code, then an space plus 10 digits of phone number like '+57 3013226756'",
    }),
    mail: z.string().refine(value => {
        const phoneRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        return phoneRegex.test(value);
    }, {
        message: "Please insert a valid email",
    })
});

export default function EditClient({ setModal2, clientEdited, client }) {

    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (client) => {
        try {
            await editClient(client.id, client);
            location.reload();
        } catch (error) {
            console.error('Error al editar el cliente:', error);
        }

    };

    const handleCloseModal = () => {
        setModal2(false);
    }

    useEffect(() => {
        if (Object.keys(clientEdited).length > 0) {
            form.setValue('id', client.id)
            form.setValue('name', clientEdited.name);
            form.setValue('last_name', clientEdited.last_name);
            form.setValue('phone', clientEdited.phone);
            form.setValue('mail', clientEdited.mail);
            form.setValue('type', clientEdited.type);
        }
    }, []);


    return (

        <div className="absolute inset-0 bg-black bg-opacity-80 z-20 flex justify-center items-center h-full">
            <div className="modalInside">
                <div className="hover: cursor-pointer self-end mr-5 mt-5" onClick={handleCloseModal}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-4/5">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <input type="hidden" {...field} value={field.value ?? ''} />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client's Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Name" {...field} value={field.value ?? ''}
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
                                    <FormLabel>Client's Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last Name" {...field} value={field.value ?? ''} />
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
                                    <FormLabel>Client's Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone" {...field} value={field.value ?? ''} />
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
                                    <FormLabel>Client's Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="modal">Edit Client</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}