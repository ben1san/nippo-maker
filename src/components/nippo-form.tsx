"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
    chatLog: z.string().min(10, {
        message: "Chat log must be at least 10 characters.",
    }),
})

export function NippoForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            chatLog: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        toast.success("Nippo generated successfully!");
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="chatLog"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Chat Log</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Paste your chat log here..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Generate Nippo</Button>
            </form>
        </Form>
    )
}
