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
import { postGadget } from "@/models/gadgets";

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Name's gadget is required to be added on gadget's list.",
    }),
    type: z.string({
        required_error: "Type's gadget is required to added on gadget's list.",
    }),
    state: z.string({
        required_error: "State's gadget is required to added on gadget's list.",
    }),
    schedule_id: z.string().nullable().transform(value => {
        if (value === null) {
            return null;
        } else {
            const parsedValue = parseInt(value);
            return isNaN(parsedValue) ? null : parsedValue;
        }
    })
});

export default function CreateGadget({ setModal, schedules }) {


    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (gadget) => {
        try {
            console.log(gadget);
            await postGadget(gadget);
            window.location.reload();
        } catch (error) {
            console.error('Error al crear el gadget:', error);
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
                                    <FormLabel>Gadget's Name</FormLabel>
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
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gadget's Type</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Type" {...field} value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="schedule_id"
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
                                                {schedules.map(schedule_ => (
                                                    <SelectItem key={schedule_.id} value={schedule_.id.toString()} className="flex justify-between items-center gap-2">
                                                        <p>{schedule_.name}<span className="font-bold"> ID: {schedule_.id}</span></p>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="modal">Add New Gadget</Button>
                    </form>
                </Form>
            </div>

        </div>


    );
}