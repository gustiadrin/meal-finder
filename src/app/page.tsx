"use client";
import { useState } from "react";
import SideNav from "./components/SideNav";
import PrincipalContent from "./components/PrincipalContent";
import Header from "./components/Header";

export default function Home() {
  const [category, setCategory] = useState("Beef");
  return (
    <>
      <Header></Header>
      <main className="flex flex-auto">
        <SideNav setCategory={setCategory}></SideNav>
        <PrincipalContent meal={category}></PrincipalContent>
      </main>
    </>
  );
}
