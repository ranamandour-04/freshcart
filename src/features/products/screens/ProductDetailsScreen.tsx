import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/free-mode";
import ProductCard from "../components/ProductCard";
import { getSpecificProducts } from "../api/SpecificProduct";
import ProductInfo from "../components/ProductInfo";
import RelatedProducts from "../components/RelatedProducts";
import { getRelatedProducts } from "../api/RelatedProducts";
type props = { id: string };
export default async function ProductDetailsScreen({ id }: props) {
  const productResponse = await getSpecificProducts(id);
  const categoryID = productResponse.data.category._id;
  const relatedProducts = await getRelatedProducts(categoryID);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-800 pb-20">
      {/* product info */}
      <div>
        <ProductInfo productInfo={productResponse.data} />
      </div>
      {/* related products */}
      <section>
        <RelatedProducts products={relatedProducts.data} id={id} />
      </section>
    </div>
  );
}
