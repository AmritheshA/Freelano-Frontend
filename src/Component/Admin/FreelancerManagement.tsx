import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AdminSideBar from "../Home/Admin/AdminSideBar"
import { useEffect, useState } from "react"
import axiosInstance from "@/Config/AxiosConfig/axiosConfig"

// const data: Freelancer[] = [
//     {
//         id: "m5gr84i9",
//         name: "John Doe",
//         email: "john@example.com",
//         projectsCompleted: 12,
//         status: "active",
//         image: "https://cdn.pixabay.com/photo/2022/09/08/15/16/cute-7441224_640.jpg",
//     },
//     {
//         id: "3u1reuv4",
//         name: "Jane Smith",
//         email: "jane@example.com",
//         projectsCompleted: 8,
//         status: "active",
//         image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//     },
//     {
//         id: "derv1ws0",
//         name: "Bob Johnson",
//         email: "bob@example.com",
//         projectsCompleted: 5,
//         status: "blocked",
//         image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//     },
//     {
//         id: "5kma53ae",
//         name: "Sarah Lee",
//         email: "sarah@example.com",
//         projectsCompleted: 15,
//         status: "active",
//         image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//     },
//     {
//         id: "bhqecj4p",
//         name: "Michael Chen",
//         email: "michael@example.com",
//         projectsCompleted: 10,
//         status: "blocked",
//         image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//     },
// ]

export type Freelancer = {
    freelancerId: string
    freelancersAuthId: string
    userName: string
    email: string
    projectCompleted: number
    blocked: true | false
    profileImgUrl: string
}

export const columns: ColumnDef<Freelancer>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorFn: (row) => {
            const image = row.profileImgUrl;
            const name = row.userName;
            return { image, name };
        },
        header: "Freelancer",
        cell: ({ getValue }) => {
            const { image, name } = getValue() as { image: string; name: string };

            return (
                <div className="flex items-center space-x-3">
                    <img src={image} alt={name} className="h-10 w-10 rounded-full" />
                    <span className="poetsen-one-regular">{name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className=" ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase font-semibold">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "projectsCompleted",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Projects Completed
                    <ArrowUpDown className=" ml-2 h-4 w-4" />
                </Button>
            )
        },

        cell: ({ row }) => {
            const freelancer = row.original;
            return (
                <div>
                    {freelancer.projectCompleted}
                </div>
            );
        }
        
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const freelancer = row.original;
            const handleBlock = () => {
                axiosInstance.get(`/api/v1/user/blockFreelancer?freelancerId=${freelancer.freelancersAuthId}&booleans=${freelancer.blocked}`)
            };

            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className={`sr-only  ${freelancer.blocked ? "text-green-500" : "text-red-500"}`}>Action</span>
                            {freelancer.blocked ? "Un-Block" : "Block"}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-slate-900" onClick={handleBlock}>
                                {freelancer.blocked ? "Un-Block" : "Block"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        },
    },
]

export function FreelancerManagement() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const [data, setData] = useState<Freelancer[]>([]);

    useEffect(() => {
        const fetchAllFreelancer = async () => {

            const responce = await axiosInstance.get("/api/v1/user/getAllFreelancer");
            setData(responce.data);

            console.log(responce.data);

        }
        fetchAllFreelancer();
    }, []);



    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <AdminSideBar>
            <h1 className="text-2xl font-bold mb-8">Freelancer Management</h1>
            <div className="w-full">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>)
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AdminSideBar>
    )
}