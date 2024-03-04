import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import {ChildrenProps} from "@/types";
import MainFooter from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";

export const metadata: Metadata = {
  title: "알라딘 설문조사",
  description: "알라딘 시스템 설문조사",
};


export default function RootLayout({ children }: Readonly<ChildrenProps>) {
  return (
      <html>
          <body className={`h-screen flex flex-col`}>
              <Nav/>
              <div className={`h-full p-2 overflow-y-auto`}>
                  {children}
              </div>
              <MainFooter/>
          </body>
      </html>
  );
}
