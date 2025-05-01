import useApidata from "@/hooks/useApiData";
import { Meals } from "@/types";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  handleModal: () => void;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  idMeal?: string;
};

export default function Modal({
  isOpen,
  handleModal,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  className = "",
  idMeal,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  const { data, loading } = useApidata<Meals>(url);
  const meal = data?.[0];

  // Manejar el cierre con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape && isOpen) {
        handleModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleModal, closeOnEscape]);

  // Manejar el clic fuera del modal
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (
      closeOnOutsideClick &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      handleModal();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl ${className}`}
      >
        {/* Botón de cierre (X) */}
        <button
          onClick={handleModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contenido del modal - versión simple que funciona */}
        <h2 className="mb-4 text-xl font-bold text-gray-800">{idMeal}</h2>
        <div className="max-h-[80vh] bg-white overflow-y-auto">
          {loading ? (
            <p>Cargando...</p>
          ) : meal ? (
            <div>
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strInstructions}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
