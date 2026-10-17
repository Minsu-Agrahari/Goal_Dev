import { z } from "zod";

export const todoValidationSchema = z.object({
    id: z.string().describe("ID of the todo"),
    title: z.string().describe("TODO Title"),
    description: z.string().optional().describe("TODO description"),
    isCompleted: z.boolean().default(false).describe("TODO status")
});

export type Todo = z.infer<typeof todoValidationSchema>
