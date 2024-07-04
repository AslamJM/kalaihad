import ProductActions from "~/components/products/ProductActions";
import ProductHistories from "~/components/products/ProductHistories";
import SingleProductDetail from "~/components/products/SingleProductDetail";
import { api } from "~/trpc/server";

const SingleProduct = async ({ params }: { params: { id: string } }) => {
  const product = await api.product.one(+params.id);
  if (product) {
    return (
      <div className="flex flex-col  md:flex-row md:space-x-4">
        <div className="md-w/2 w-full space-y-4 p-2">
          <SingleProductDetail product={product} />
          <ProductActions />
        </div>
        <div className="md-w/2 w-full p-2">
          <ProductHistories />
        </div>
      </div>
    );
  }
};

export default SingleProduct;
