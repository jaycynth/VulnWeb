'use client';

import { useCallback, useEffect, useState } from 'react';
import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { TableLoader } from '@/components/TableLoader';
import { useGetTableOptionsHook } from '@/hooks/useGetTableOptionsHook';
import { useGetUsersTableColumnHook } from '@/hooks/useGetUserColumnsHook';
import Cookies from 'js-cookie';
import { NotifyError } from '@/components/Toast/Notification';


interface User {
    username: string;
    email: string;
}

export default function Users() {
    const token =  Cookies.get("Token")

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);

    const data: Array<Array<string>> = [];

    const fetchUsers = useCallback(async () => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}users`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
              },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              setLoading(false);
              setUsers(data.data);
              setCount(data.data.length);
      
            })
            .catch((error) => {
              setLoading(false);
              NotifyError(error);
            });
    }, []);

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUsers]);

    users?.length > 0 &&
        users.map((req) => {
            data.push([req.username, req.email]);
        });

    const { columns } = useGetUsersTableColumnHook({users });

    const title = "User(s)";

    const { options } = useGetTableOptionsHook({ title, setPage,  count, page });

    return (
        <DefaultLayout>
            {loading && <TableLoader />}
            {!loading && (
                <MUIDataTable
                    title={title}
                    data={data}
                    columns={columns as MUIDataTableColumnDef[]}
                    options={options as MUIDataTableOptions}
                />
            )}
        </DefaultLayout>
    );
}
