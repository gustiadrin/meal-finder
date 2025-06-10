"use client";

import { Skeleton } from "@/app/components/ui/skeleton";
import useApiData from "@/hooks/useApiData";
import { Meals } from "@/types";
import MealCard from "./MealCard";
import { useEffect, useState } from "react";

interface PrincipalContentProps {
  meal?: string;
  searchMeal?: string;
  onMealSelect: (idMeal: string) => void;
}

export default function PrincipalContent({
  meal,
  searchMeal,
  onMealSelect,
}: PrincipalContentProps) {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    // Prioriza la búsqueda sobre la categoría
    if (meal) {
      setCurrentUrl(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
      );
    } else if (searchMeal) {
      setCurrentUrl(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`
      );
    }
  }, [meal, searchMeal]);

  const { data, loading } = useApiData<Meals>(currentUrl);

  //console.log(data);

  if (loading || !data?.length) {
    if (!data?.length && !loading) {
      return <p>no existen recetas</p>;
    }

    return (
      <div className="flex-1 bg-blue-50 overflow-y-auto min-h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 justify-items-center align-items-center sm:grid-cols-2 md:flex md:flex-wrap justify-center gap-4 p-4 md:m-[3%] min-h-full">
          {[...Array(8)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="bg-white w-full max-w-3xs h-[350px] overflow-hidden flex flex-col justify-between relative p-4 rounded-sm shadow-lg"
            >
              <Skeleton className="w-full h-[250px] rounded-sm animate-pulse bg-blue-100" />
              <Skeleton className="w-40 h-3 animate-pulse bg-blue-100" />
              <Skeleton className="w-28 h-9 animate-pulse bg-blue-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-blue-50 overflow-y-auto min-h-[calc(100vh-64px)]">
      <div className="grid grid-cols-1 justify-items-center align-items-center sm:grid-cols-2 md:flex md:flex-wrap justify-center gap-4 p-4 md:m-[3%] min-h-full">
        {data.map((meal) => (
          <MealCard
            key={meal.idMeal}
            imageUrl={meal.strMealThumb}
            title={meal.strMeal}
            handleModal={onMealSelect}
            idMeal={meal.idMeal}
          />
        ))}
      </div>
    </div>
  );
}
