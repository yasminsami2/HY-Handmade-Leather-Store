import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/products/ProductDetails";
import { productService } from "@/services/productService";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  if (!product) notFound();

  const allProducts = await productService.getAll();
  const related = allProducts.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );

  return <ProductDetails product={product} related={related.slice(0, 4)} />;
}
