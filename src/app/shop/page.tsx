import { ShopCatalog } from "@/components/products/ShopCatalog";
import { categories, collections } from "@/data/categories";
import { productService } from "@/services/productService";

type SearchParams = {
  q?: string;
  category?: string;
  collection?: string;
  sort?: string;
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const [products, params] = await Promise.all([productService.getAll(), searchParams]);

  return (
    <ShopCatalog
      products={products}
      categories={categories}
      collections={collections}
      initialQuery={params.q ?? ""}
      initialCategory={params.category ?? ""}
      initialCollection={params.collection ?? ""}
      initialSort={params.sort ?? "featured"}
    />
  );
}
