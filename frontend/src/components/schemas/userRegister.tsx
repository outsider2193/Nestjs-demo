import { z } from "zod"

const signupSchema = z.object({
    name: z.string().min(2, "firstname should have atleast 2 characters"),
    email: z.email(),
    password: z.string().min(4, "Password should have atleast 4 characters"),
    age: z.int(),
    // role: z.enum(["user", "admin"])
})

export type RegisterData = z.infer<typeof signupSchema>


export default signupSchema;