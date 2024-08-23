import PricingCard from "./PricingCard";
import { IPrice } from "@/interfaces/price.interface";
import { useGetPricingQuery } from "@/features/pricing";
import PricingSkeleton from "@/components/skeletons/PricingSkeleton";

const PricingSection = () => {
  const { data, isLoading } = useGetPricingQuery({});
  const pricingData = data?.data;

  return (
    <section className="lg:py-16 p-2 text-center">
      <h2 className="lg:text-3xl text-lg font-bold mb-8">
        Choose the Right Plan for Your Team
      </h2>
      {isLoading ? (
        <PricingSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingData?.map((price: IPrice) => (
              <PricingCard key={price?.id} data={price} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default PricingSection;
