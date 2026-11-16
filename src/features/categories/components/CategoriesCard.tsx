import Link from "next/link";
import { Category } from "../types/CategoriesTypes";

export default function CategoriesCard({
  categoryInfo,
}: {
  categoryInfo: Category;
}) {
  // console.log(categoryInfo);
  return (
    <div className="group cursor-pointer relative flex flex-col justify-center gap-3 rounded-xl h-44 w-full border border-slate-200 bg-white transition-all duration-300 hover:shadow-md">
      <div className="rounded-full flex items-center justify-center">
        <img
          src={categoryInfo.image}
          alt="image"
          className="rounded-full size-24"
        />
      </div>
      <h3 className="text-center font-medium">{categoryInfo.name}</h3>
      <Link
        className="absolute inset-0"
        href={`/categories/${categoryInfo._id}`}
      ></Link>
    </div>
  );
}
