import ProductDetailsScreen from "@/features/products/screens/ProductDetailsScreen";

export type Props = { params: Promise<{ id: string }> };
export default async function ProductDetailspage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <ProductDetailsScreen id={id}/>
    </div>
  );
}
