"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconLogout,
  IconPhotoSensor,
  IconUserStar,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    {
      title: "Lens",
      icon: <IconPhotoSensor className="h-full w-full text-neutral-300" />,
      href: "/u/lens",
    },
    {
      title: "Coach",
      icon: <IconUserStar className="h-full w-full text-neutral-300" />,
      href: "/u/coach",
    },
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-300" />,
      href: "/u/home",
    },
    {
      title: "Logout",
      icon: (
        <IconLogout
          onClick={() => signOut({ callbackUrl: "/" })}
          className="h-full w-full text-neutral-300"
        />
      ),
      href: "/#",
    },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 w-full bg-black bg-dot-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative">
        <QueryClientProvider client={new QueryClient()}>
          {children}
        </QueryClientProvider>
        <div className="z-50 fixed bottom-4 right-4 md:right-0 flex items-center justify-end md:justify-center w-full">
          <FloatingDock items={links} />
        </div>
      </div>
    </div>
  );
}
