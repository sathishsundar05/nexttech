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

// Validation schema for the form using Zod
const vendorSchema = z.object({
  vendor_name: z.string().min(2, "Vendor name must be at least 2 characters"),
  mobileno: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  vendor_type: z.string().min(1, "Please select a vendor type"),
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  note: z.string().min(2, "Note must be at least 2 characters")
});

export default function AddVendorForm({ prefillData }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);  // State to track form submission

  // Initialize form with validation resolver and default values
  const form = useForm({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      vendor_name: prefillData?.vendor_name,
      mobileno: prefillData?.mobileno,
      email: prefillData?.email,
      vendor_type: prefillData?.vendor_type,
      company_name: prefillData?.company_name,
      country: prefillData?.country,
      note: prefillData?.note || "" // Include the note field in default values
    }
  });

  // Submit handler for form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);  // Set submitting state
    try {
      // Determine if the API is for adding or updating vendors
      data.gofor = prefillData ? "editvendors" : "addvendors";

      if (prefillData && prefillData.vendor_id) {
        data.vendor_id = prefillData.vendor_id; // Include vendor ID if updating
      }

      // Post form data to the backend API
      const response = await axios.post(
        "https://workfreaks.xyz/App/api.php",
        data
      );

      if (response.data.response === "Vendor Inserted") {
        toast({
          title: "Success",
          description: "The vendor has been successfully added.",
          variant: "default"
        });
        setTimeout(() => {
          router.push("/dashboard");  // Redirect to dashboard after success
        }, 3000);
      } else if (response.data.response === "Vendor Already Exists") {
        toast({
          title: "Vendor Exists",
          description: "The vendor already exists.",
          variant: "warning"
        });
      } else {
        // Unexpected response case
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      // Handle error and display toast notification with details
      let errorMessage = "Failed to add vendor. Please try again.";
      if (error.response) {
        // If the API responded with an error, show the API's message
        errorMessage = `API Error: ${error.response.data.message}`;
      } else if (error.request) {
        // If no response was received, it might be a network error
        errorMessage = "Network Error: No response from the server.";
      } else {
        // Other errors
        errorMessage = `Error: ${error.message}`;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);  // Reset submitting state
    }
  };

  // Function to dynamically change the button text based on the action
  const getButtonName = () => {
    return prefillData ? "Update Vendor" : "Add Vendor";
  };

  return (
    <div className="max-w-md mx-auto my-8"> {/* Added margin for top and bottom spacing */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            router.push("/dashboard");  // Navigate back to dashboard
          }}
        >
          Back
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-2">
        {prefillData ? "Update Vendor" : "Add Vendor"}
      </h1>

      {/* Form component */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Vendor Name Field */}
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
          {/* Mobile Number Field */}
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
          {/* Email Field */}
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
          {/* Vendor Type Field */}
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
          {/* Company Name Field */}
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
          {/* Country Field */}
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
          {/* Note Field */}
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

          {/* Submit Button */}
          <div className="flex justify-end mb-8">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : getButtonName()}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
