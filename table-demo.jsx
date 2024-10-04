'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TableDemo({vendors}) {
  return (
    (<Table>
      <TableHeader>
        <TableRow>
        <TableHead>Vendor Name</TableHead>
        <TableHead>Mobile No</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Vendor Type</TableHead>
        <TableHead>Company Name</TableHead>
        <TableHead>Country</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors.map((vendor, index) => (
          <TableRow key={vendor.invoice}>
            <TableCell>{vendor.vendor_name}</TableCell>
            <TableCell>{vendor.mobileno}</TableCell>
            <TableCell>{vendor.email}</TableCell>
            <TableCell>{vendor.vendor_type}</TableCell>
            <TableCell>{vendor.company_name}</TableCell>
            <TableCell>{vendor.country}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>)
  );
}
