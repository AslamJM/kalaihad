"use client";

import CardWrapper from "~/components/common/CardWrapper";
import Loader from "~/components/common/Loader";
import { api } from "~/trpc/react";
import PaymentDetails from "./PaymentDetails";

const SinglePayment = ({ id }: { id: number }) => {
  const payment = api.payment.one.useQuery(id);
  return (
    <CardWrapper title="Payment Details">
      {payment.isLoading && <Loader />}
      {payment.data && <PaymentDetails details={payment.data} />}
    </CardWrapper>
  );
};

export default SinglePayment;
