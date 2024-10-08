"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const vendorSchema = z.object({
  vendor_name: z.string().min(2, "Vendor name must be at least 2 characters"),
  mobileno: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  vendor_type: z.string().min(1, "Please select a vendor type"),
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  note: z.string().min(2, "Note must be at least 2 characters")
});

export default function AddVendorForm({prefillData}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      vendor_name: prefillData?.vendor_name,
      mobileno: prefillData?.mobileno,
      email: prefillData?.email,
      vendor_type: prefillData?.vendor_type,
      company_name: prefillData?.company_name,
      country: prefillData?.country
    },
    onSubmit: () => {
      alert();
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      data.gofor = prefillData ? "editvendors" : "addvendors";

      if (prefillData && prefillData.vendor_id) {
        data.vendor_id = prefillData.vendor_id;
      }

      const response = await axios.post(
        "https://workfreaks.xyz/App/api.php",
        data
      );

      if (response.data.response === "Vendor Inserted") {
        toast({
          title: response.data.response,
          description: "The vendor has been successfully added."
        });

        setTimeout(() => {
            router.push("/dashboard");
        }, 3000)
      }

      if (response.data.response === "Vendor Already Exists") {
        toast({
          title: response.data.response,
          description: "The vendor already exists"
        });
      }
    } catch (error) {
      console.error("Error submitting vendor data:", error);
      toast({
        title: "Error",
        description: "Failed to add vendor. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const getButtonName = () => {
    return prefillData ? "Update Vendor" : "Add Vendor"
  }
  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          back
        </Button>
      </div>
      {!prefillData && (<h1 className="text-2xl font-bold mb-4">Add Vendor</h1>)}
      {prefillData && (<h1 className="text-2xl font-bold mb-4">Update Vendor</h1>)}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="vendor_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter vendor name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobileno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vendor_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your vendor type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input placeholder="Enter note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isSubmitting ? "Submitting..." : getButtonName()}
          </Button>
        </form>
      </Form>
    </div>
  );
}
