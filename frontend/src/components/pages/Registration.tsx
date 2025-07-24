import { Button, TextField, Typography, Box } from "@mui/material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import signupSchema, { type RegisterData } from "../schemas/userRegister"
import { Bounce, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import API from "../../api/axios"

export default function Registration() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterData>({ resolver: zodResolver(signupSchema) })

    const navigate = useNavigate();

    const onSubmit = async (data: RegisterData) => {
        try {

            const response = await API.post("/auth/register", data);

            toast.success("Registration successful!");
            console.log(response.data)
            reset();
            navigate("/login");

        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;

                if (status === 409) {
                    toast.error("User already exists!", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                } else if (status === 404) {
                    toast.error("API route not found!", {
                        position: "top-center",
                        autoClose: 5000,
                        theme: "colored",
                        transition: Bounce,
                    });
                } else if (status === 500) {
                    toast.error("Server error. Please try again later.", {
                        position: "top-center",
                        autoClose: 5000,
                        theme: "colored",
                        transition: Bounce,
                    });
                } else {
                    toast.error(`Error: ${error.response.data.message || "Something went wrong"}`);
                }

            } else {

                toast.error("No response from server. Check your connection.");
            }

            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box


                sx={{ display: "flex", flexDirection: "column", gap: 2, width: "300px", mx: "auto", mt: 4 }}
            >
                <Typography variant="h4" textAlign="center">
                    User Registration
                </Typography>

                <TextField
                    label="First Name"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    label="Email"
                    type="email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    label="Password"
                    type="password"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                <TextField
                    label="Age"
                    type="number"
                    {...register("age", { valueAsNumber: true })}
                    error={!!errors.age}
                    helperText={errors.age?.message}
                />


                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </Box>
        </form>
    )
}
