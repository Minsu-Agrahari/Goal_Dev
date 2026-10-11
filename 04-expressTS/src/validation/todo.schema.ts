import { z } from 'zod'

export const todoValidationSchema = z.object({
    id: z.string().describe('ID of the todo'),
    title: z.string().describe('title of the todo'),
    description: z.string().optional().describe('description for the table'),
    isCompleted: z.boolean().default(false).describe('if the todo item is completed or not')
});

export type Todo = z.infer<typeof todoValidationSchema>

// export interface ITodo {
//     id: string,
//     title: string,
//     description?: string,
//     isCompleted: boolean,
// }
