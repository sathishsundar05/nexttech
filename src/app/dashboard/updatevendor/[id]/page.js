"use client"

import AddVendorForm from "@/components/add-vendor-form"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateVendor() {
  const router = useParams();
  const [prefillData, setPrefillData] = useState();

  const getData = async () => {
    const id = router.id;
    const response = await axios.get("https://workfreaks.xyz/App/api.php?gofor=vendorssingle&vendor_id="+id);
    setPrefillData(response.data);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="main">
      {prefillData && (<AddVendorForm prefillData={prefillData} />)}
    </div>
  );
}