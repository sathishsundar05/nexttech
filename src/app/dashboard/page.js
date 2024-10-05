"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "../components/navbar";
import TableDemo from "@/components/table-demo"

const DashboardPage = () => {
  const router = useRouter();
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    try {
      const response = await fetch('https://workfreaks.xyz/App/api.php?gofor=vendorslist');
      const data = await response.json();
      setVendors(data);
    } catch (err) {
      console.error("Error fetching vendors:", err);
    }
  };

  useEffect(() => {
    const check = sessionStorage.getItem("userLoggedin");

    if (check === "true") {
      fetchVendors();
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div>
      {sessionStorage.getItem("userLoggedin") === "true" && (
        <div className="flex">
          <Navbar></Navbar>
          <div className="w-full p-4">
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  sessionStorage.setItem("userLoggedin", false);
                  router.push("/");
                }}
              >
                Logout
              </Button>
            </div>
           <div className="page-content">
            <h2 className="pb-3 font-bold">Vendor List</h2>
            {vendors && (<TableDemo vendors={vendors}></TableDemo>)}
            </div>
          </div>
        </div>
      )}

      {sessionStorage.getItem("userLoggedin") === "false" && <p>Loading...</p>}
    </div>
  );
};

export default DashboardPage;
