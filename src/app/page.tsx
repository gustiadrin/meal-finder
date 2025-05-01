"use client";
import { useState } from "react";
import SideNav from "./components/SideNav";
import PrincipalContent from "./components/PrincipalContent";
import Header from "./components/Header";
import Modal from "./components/Modal";

export default function Home() {
  const [category, setCategory] = useState("Beef");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idMeal, setIdMeal] = useState("");

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

  const openModal = (idMeal: string) => {
    setIdMeal(idMeal);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Header setSearch={handleSearch}></Header>
      <main className="flex flex-1 min-h-0">
        <SideNav setCategory={handleCategory}></SideNav>
        <PrincipalContent
          meal={category}
          searchMeal={search}
          onMealSelect={openModal}
        ></PrincipalContent>
      </main>
      <Modal
        isOpen={isModalOpen}
        handleModal={() => openModal(idMeal)}
        idMeal={idMeal}
      ></Modal>
    </>
  );
}
