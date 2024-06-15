import { FormLabel, FormGroup, TextField, IconButton } from '@mui/material';
import { IconEdit, IconTrash, IconUserBolt } from '@tabler/icons-react';
import { MUIDataTableColumn } from 'mui-datatables';

interface User {
    username: string;
    email: string;
}

interface UseGetUsersTableColumnHookProps {
    users: User[];
}

export const useGetUsersTableColumnHook = ({users }: UseGetUsersTableColumnHookProps) => {
    const columns: MUIDataTableColumn[] = [
        {
            name: "username",
            label: "Name",
            options: {
                filter: false,
            },
        },
       
        {
            name: "email",
            label: "Email",
            options: {
                filter: false,
            },
        },
       
    ];

    return { columns };
};
