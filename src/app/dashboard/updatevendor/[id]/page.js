"use client";

import AddVendorForm from "@/components/add-vendor-form";
import { useParams } from "next/navigation";  // Correct use of router for dynamic routes in Next.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateVendor() {
  const { id } = useParams(); // Correct way to access dynamic route parameters
  const [prefillData, setPrefillData] = useState();

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://workfreaks.xyz/App/api.php?gofor=vendorssingle&vendor_id=${id}`
      );
      setPrefillData(response.data);
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]); // Only re-fetch when `id` changes

  return (
    <div className="flex-center">
    <div className="main">
      {prefillData ? (
        <AddVendorForm prefillData={prefillData} />
      ) : (
        <p>Loading vendor data...</p>
      )}
    </div>
    </div>
  );
}
