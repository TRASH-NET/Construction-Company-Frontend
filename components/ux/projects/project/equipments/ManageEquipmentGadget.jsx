"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { editGadget } from "@/models/gadgets"

const FormSchema = z.object({

    schedule_id: z.any().transform((value) => {
        if (value === null || value === undefined) {
            return null;
        }
        const numericValue = parseInt(value);
        return isNaN(numericValue) ? null : numericValue;
    })
});


const ManageEquipmentGadget = ({ schedules, gadget }) => {

    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    const [editgadgetSchedule_id, setEditgadgetSchedule_id] = useState({ id: gadget.id, schedule_id: gadget.schedule_id });

    const { toast } = useToast()

    const matchScheduleName = (schedulesData, gadgetData) => {
        const matching = schedulesData?.find(scheduleData => scheduleData.id === gadgetData);
        return matching ? matching?.name : "Unassigned";
    }

    const onSubmit = async (gadgetEdited) => {
        try {
            await editGadget(gadget.id, gadgetEdited);
            toast({
                title: <b>Gadget Assigned Successfully</b>,
                description: `Gadget: ${gadget.name}, Assigned to: ${matchScheduleName(schedules, gadgetEdited.schedule_id)}`
            })
            setTimeout(() => {
                location.reload();
            }, 500);
        } catch (error) {
            console.error('Error al editar el gadget:', error);
        }
    };

    useEffect(() => {
        if (editgadgetSchedule_id) {
            form.setValue('id', editgadgetSchedule_id.id);
            form.setValue('schedule_id', editgadgetSchedule_id.schedule_id);
        }
    }, []);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-start items-center gap-2 ">
                    <FormField
                        control={form.control}
                        name="schedule_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder={
                                                field.value
                                                    ? (matchScheduleName(schedules, field.value))
                                                    : "Unassigned"
                                            } />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={null}>N/A</SelectItem>
                                            {schedules.map(schedule_ => (
                                                <SelectItem key={schedule_.id} value={schedule_.id.toString()} className="flex justify-between items-center gap-2">
                                                    <p>{schedule_.name}</p>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <Button type="submit" variant="check" size="check">Ok</Button>
                </form>
            </Form>
            <Toaster />

        </>


    );
};

export default ManageEquipmentGadget;

