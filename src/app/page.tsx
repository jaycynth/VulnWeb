'use client'

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()


  useEffect(() => {
      router.push("/auth/signin")
  }, [])

  return (
    <main>
      
    </main>
  
);
};


Home.getLayout = function getLayout(page: any) {
return <DefaultLayout>{page}</DefaultLayout>;
};

