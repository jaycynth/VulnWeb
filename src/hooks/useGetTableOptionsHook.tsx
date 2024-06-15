import { Button } from "@mui/material";
import { MUIDataTableOptions, MUIDataTableState } from "mui-datatables";

interface TableOptionsHookProps {
    title: string;
    setPage: (page: number) => void;
    count: number;
    page: number;
}

interface TableOptionsHookResult {
    options: MUIDataTableOptions;
}

export const useGetTableOptionsHook = ({
    title,
    setPage,
    count,
    page,
}: TableOptionsHookProps): TableOptionsHookResult => {

    const options: MUIDataTableOptions = {
        filter: true,
        filterType: "textField",
        download: false,
        print: false,
        search: false,
        sort: false,
        rowsPerPage: 200,
        selectableRows: "none",
        serverSide: true,
        rowsPerPageOptions: [200],
        textLabels: {
            body: {
                noMatch: `No ${title} records found`,
            },
        },
        count: count,
        page: page,
        confirmFilters: true,
        onTableChange: (action: string, tableState: MUIDataTableState) => {
            if (action === "changePage") {
            }
            setPage(tableState.page);
        },
        

    };

    return { options };
}
