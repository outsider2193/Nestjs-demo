
import { useForm } from "react-hook-form"
import loginSchema, { type loginData } from "../schemas/userLogin"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, TextField, Typography } from "@mui/material"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import API from "../../api/axios"
import { useNavigate } from "react-router-dom"

export default function Login() {



    const { register, handleSubmit, formState: { errors }, reset } = useForm<loginData>({ resolver: zodResolver(loginSchema) })
    const navigate = useNavigate()
    const onSubmit = async (data: loginData) => {

        interface jwtPayload {
            role: string
        }
        try {
            const response = await API.post("/auth/login", data);
            const token = response.data.token;
            localStorage.setItem("token", token)
            const decodedToken = jwtDecode<jwtPayload>(token);
            console.log(decodedToken.role);
            console.log(response.data);
            const userRole = decodedToken.role;
            if (userRole === "user") {
                console.log("This is user ")
            }
            else if (userRole === "admin") {
                navigate("/createuser")
            }
            toast.success("Login succesful")
            reset();


        } catch (error: any) {

            toast.error(`Error: ${error.response.data.message || "Something went wrong"}`);

        }
    }

    return (
        <>

            <div>Login</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box

                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "250px",
                        mx: "auto",
                        mt: 5
                    }}
                >
                    <Typography variant="h4">Login </Typography>
                    <TextField
                        variant="outlined"
                        label="Enter email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}

                    />
                    <TextField
                        variant="outlined"
                        label="Enter password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}

                    />

                    <Button type="submit" variant="contained" color="primary">

                        Login
                    </Button>
                </Box >
            </form>


        </>


    )

}
