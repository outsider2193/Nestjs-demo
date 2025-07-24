import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Homepage() {

    const navigate = useNavigate();

    const registerPage = () => {
        navigate("/register")
    };
    return (
        <>
            <div>This is the generic homepage</div>
            <Box textAlign={"center"}>
                <Button variant="contained" size="small"
                    onClick={() => registerPage()}
                >Go to Register</Button>
            </Box>
        </>
    )
}
