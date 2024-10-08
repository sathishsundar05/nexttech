'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { EllipsisVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function VendorTable() {
  const [vendors, setVendors] = useState([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [vendorToDelete, setVendorToDelete] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      const response = await axios.get('https://workfreaks.xyz/App/api.php?gofor=vendorslist')
      setVendors(response.data)
    } catch (error) {
      console.error('Error fetching vendors:', error)
    }
  }

  const handleDelete = (vendor) => {
    setVendorToDelete(vendor)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!vendorToDelete) return

    try {
      await axios.post(`https://workfreaks.xyz/App/api.php?gofor=vendorsdelete&vendor_id=${vendorToDelete.vendor_id}`)
      await fetchVendors() 
      setIsDeleteDialogOpen(false)
      setVendorToDelete(null)
    } catch (error) {
      console.error('Error deleting vendor:', error)
    }
  }

  const handleUpdate = (vendor) => {
    router.push(`/dashboard/updatevendor/${vendor.vendor_id}`)
  }

  return (
    <>
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
          {vendors.map((vendor) => (
            <TableRow key={vendor.vendor_id}>
              <TableCell>{vendor.vendor_name}</TableCell>
              <TableCell>{vendor.mobileno}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.vendor_type}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <EllipsisVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => handleUpdate(vendor)}>Update</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleDelete(vendor)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this vendor?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the vendor
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}