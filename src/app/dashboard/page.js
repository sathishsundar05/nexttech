"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "../components/navbar";

const DashboardPage = () => {
  const router = useRouter();

  // mounting
  useEffect(() => {
    const check = sessionStorage.getItem("userLoggedin");

    if (check === "true") {
      // alert("User already loggedin");
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
            <div className="page-content"></div>
          </div>
        </div>
      )}

      {sessionStorage.getItem("userLoggedin") === "false" && <p>Loading...</p>}
    </div>
  );
};

export default DashboardPage;
