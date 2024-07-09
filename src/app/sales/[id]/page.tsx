import { api } from "~/trpc/server";
import SingleSaleDetails, {
  type SaleQuerySingle,
} from "../_components/SingleSaleDetails";
import SinglePayment from "../_components/SinglePayment";

const SingleSale = async ({ params }: { params: { id: string } }) => {
  const sale = (await api.sales.one(+params.id)) as unknown as SaleQuerySingle;

  return (
    <div className="flex flex-col gap-x-4 md:flex-row">
      <div className="w-full md:w-1/2">
        <SingleSaleDetails sale={sale} />
      </div>
      <div className="w-full md:w-1/2">
        <SinglePayment id={sale.id} />
      </div>
    </div>
  );
};

export default SingleSale;
