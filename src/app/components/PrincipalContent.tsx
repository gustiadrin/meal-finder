"use client";

import { Skeleton } from "@/app/components/ui/skeleton";
import useApiData from "@/hooks/useApiData";
import { Meals } from "@/types";
import MealCard from "./MealCard";

interface PrincipalContentProps {
  meal: string;
}

export default function PrincipalContent({ meal }: PrincipalContentProps) {
  const { data, loading } = useApiData<Meals>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
  );
  if (loading || !data?.length) {
    return (
      <div className="flex-1 bg-blue-50">
        <div className="h-auto gap-4 m-[3%] flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center">
          {/* Mismo número de skeletons que cards mostrarías */}
          {[...Array(8)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="bg-white max-w-3xs h-[350px] overflow-hidden flex flex-col justify-between relative p-4 rounded-sm shadow-lg"
            >
              <Skeleton className="w-[224px] h-[250px] rounded-sm animate-pulse bg-blue-100" />
              <Skeleton className="w-40 h-3 animate-pulse bg-blue-100" />
              <Skeleton className="w-28 h-9 animate-pulse bg-blue-100" />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex-1 bg-blue-50 min-h-[calc(100vh-64px)]">
        <div className="gap-4 m-[3%] md:min-h-screen  flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center">
          {data.map((meal) => (
            <MealCard
              key={meal.strMealThumb}
              imageUrl={meal.strMealThumb}
              title={meal.strMeal}
            ></MealCard>
          ))}
        </div>
      </div>
    );
  }
}
