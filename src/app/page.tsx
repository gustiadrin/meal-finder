"use client";
import { useState } from "react";
import SideNav from "./components/SideNav";
import PrincipalContent from "./components/PrincipalContent";
import Header from "./components/Header";

export default function Home() {
  const [category, setCategory] = useState("Beef");
  const [search, setSearch] = useState("");

  // Resetear la categoría cuando se realiza una búsqueda
  const handleSearch = (searchTerm: string) => {
    setCategory("");
    setSearch(searchTerm);
  };

  // Resetear la búsqueda cuando se selecciona una categoría
  const handleCategory = (category: string) => {
    setSearch("");
    setCategory(category);
  };
  return (
    <>
      <Header setSearch={handleSearch}></Header>
      <main className="flex flex-1 min-h-0">
        <SideNav setCategory={handleCategory}></SideNav>
        <PrincipalContent
          meal={category}
          searchMeal={search}
        ></PrincipalContent>
      </main>
    </>
  );
}
