import { Box, Button } from "@mui/material";
import API from "../../api/axios";
import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';



interface User {
    id: number,
    name: string,
    age: number,
    email: string,
    role: string
}


export default function Createuser() {

    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        getAllUsers()
    }, [])


    const getAllUsers = async () => {
        try {
            const response = await API.get("/auth/allusers")
            console.log(response.data.result)
            setUsers(response.data.result)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: number) => {
        const confirm = window.confirm("Are you sure?");
        if (!confirm) return;

        try {
            await API.delete(`/auth/delete/${id}`);
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        }

    }

    const handleUpdate = async (user: User) => {
        const newName = prompt("Enter new name:", user.name);
        const newEmail = prompt("Enter new email:", user.email);
        const newAge = prompt("Enter new age:", String(user.age));

        if (!newName || !newEmail || !newAge) {
            alert("All fields are required.");
            return;
        }

        try {
            await API.put(`/auth/update/${user.id}`, {
                ...user,
                name: newName,
                email: newEmail,
                age: Number(newAge),
            });
            getAllUsers();
        } catch (error) {
            console.log(error);
        }
    };



    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 170 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "age", headerName: "AGE", width: 70 },
        { field: "role", headerName: "Role", width: 70 },
        {
            field: "update",
            headerName: "Update",
            width: 120,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleUpdate(params.row)}
                >
                    Update
                </Button>
            ),
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 120,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(params.row.id)}
                >
                    Delete
                </Button>
            ),
        },



    ]



    return (

        <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={users}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                    },
                }}
                pageSizeOptions={[5, 9, 20]}
            // getRowId={(row) => row.id} 
            />

        </Box>
    )
}
