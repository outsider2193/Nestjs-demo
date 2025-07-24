import { z } from "zod"


const loginSchema = z.object({
    email: z.email(),
    password: z.string()
})


export type loginData = z.infer<typeof loginSchema>


export default loginSchema;