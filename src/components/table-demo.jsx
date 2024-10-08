"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";


export default function TableDemo({ vendors }) {
  const router = useRouter();
const redirect = (id) => {
  router.push(`/dashboard/updatevendor/${id}`);
}
      
  return (

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vendor Name</TableHead>
          <TableHead>Mobile No</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Vendor Type</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors.map((vendor, index) => (
          <TableRow key={vendor.invoice}>
            <TableCell>{vendor.vendor_name}</TableCell>
            <TableCell>{vendor.mobileno}</TableCell>
            <TableCell>{vendor.email}</TableCell>
            <TableCell>{vendor.vendor_type}</TableCell>
            <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger><EllipsisVertical></EllipsisVertical></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => redirect(vendor.vendor_id)} >Update  </DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
