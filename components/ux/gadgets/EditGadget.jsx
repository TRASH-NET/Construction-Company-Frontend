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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { editGadget } from "@/models/gadgets";

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

export default function EditGadget({ setModal2, gadgetEdited, gadget }) {

    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (gadgetEdited) => {
        try {
            const edited = await editGadget(gadget.id, gadgetEdited);
            location.reload();
        } catch (error) {
            console.error('Error al editar el gadget:', error);
        }

    };

    const handleCloseModal = () => {
        setModal2(false);
    }

    useEffect(() => {
        if (Object.keys(gadgetEdited).length > 0) {
            form.setValue('id', gadget.id)
            form.setValue('name', gadgetEdited.name);
            form.setValue('type', gadgetEdited.type);
            form.setValue('state', gadgetEdited.state);
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
                                <input type="hidden" {...field} />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gadget's Name</FormLabel>
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
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gadget's Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={field.value} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Hand Tool">Hand Tool</SelectItem>
                                                <SelectItem value="Heavy Equipment">Heavy Equipment</SelectItem>
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
                                        <Select onValueChange={field.onChange} defaultValue={''}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={field.value} />
                                            </SelectTrigger>
                                            <SelectContent >
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
                        <Button type="submit" variant="modal">Edit Gadget</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}