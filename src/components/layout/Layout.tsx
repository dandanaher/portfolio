
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SidebarProvider from "@/providers/sidebar-provider";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import faviconUrl from "@/assets/branding/favicon.png";
import asciiLogo from "@/assets/branding/ascii_logo_60x30_inverted.txt?raw";
import { THEME_COMBINATIONS } from "@/constants/theme";

const Layout = () => {
  useEffect(() => {
    document.title = "Dan Danaher";

    const existing = document.querySelector<HTMLLinkElement>("link[rel=icon]");
    const link = existing ?? document.createElement("link");

    link.rel = "icon";
    link.type = "image/png";

    if (!existing) {
      document.head.appendChild(link);
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = faviconUrl;

    img.onload = () => {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        link.href = faviconUrl;
        return;
      }

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      const minDim = Math.min(img.width, img.height);
      const sx = (img.width - minDim) / 2;
      const sy = (img.height - minDim) / 2;

      ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
      ctx.restore();

      link.href = canvas.toDataURL("image/png");
    };

    img.onerror = () => {
      link.href = faviconUrl;
    };

    const logAscii = () => {
      console.clear();
      console.log("%c" + asciiLogo, "font-family: monospace");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F12" || event.keyCode === 123) {
        setTimeout(logAscii, 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  
  return (
    <SidebarProvider>
      <div className={`relative h-screen w-full overflow-hidden ${THEME_COMBINATIONS.background}`}>
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="h-full flex flex-col md:pl-16">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
