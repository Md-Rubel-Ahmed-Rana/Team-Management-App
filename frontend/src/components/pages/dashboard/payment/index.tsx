import PaymentSkeleton from "@/components/skeletons/PaymentSkeleton";
import { useMyPackageQuery } from "@/features/payment";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import PlanCard from "./PlanCard";
import PaymentCard from "./PaymentCard";
import ValidityCard from "./ValidityCard";
import OtherPackageCard from "./OtherPackageCard";
import { IPackageData, PackageDetail } from "@/interfaces/package.interface";
import Link from "next/link";

const Payments = () => {
  const { data: userData }: any = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: packageData, isLoading } = useMyPackageQuery(user?.id);

  const myPackage = packageData?.data as IPackageData;

  const currentPackage = myPackage?.packages?.find(
    (pkg: any) => pkg.isCurrent === true
  ) as PackageDetail;

  return (
    <>
      {isLoading ? (
        <PaymentSkeleton />
      ) : (
        <>
          {myPackage?.id !== "undefined" && (
            <div>
              {/* // current plan analysis */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h2 className="text-xl font-semibold text-start mb-5">
                  My Current Plan
                </h2>
                <div className="flex justify-center flex-col lg:flex-row gap-3 ">
                  {/* // plan info  */}
                  <PlanCard plan={currentPackage?.plan} />
                  {/* // payment info  */}
                  <PaymentCard
                    payment={currentPackage?.payment}
                    planName={currentPackage?.plan?.name}
                  />
                  {/* // plan validity  */}
                  <ValidityCard pkg={currentPackage} />
                </div>
              </div>
              <hr className="mt-5" />
              {/* // other plans  */}
              <div className="mt-5">
                <h4 className="text-lg lg:text-2xl font-semibold">
                  Other Packages
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {myPackage?.packages?.map((pkg) => (
                    <OtherPackageCard key={pkg?.id} pkg={pkg} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {myPackage?.id === "undefined" && (
            <div className="h-[80vh] flex flex-col justify-center items-center">
              <p className="text-lg lg:text-2xl font-semibold">
                You have not purchase any plan yet.
              </p>
              <Link
                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
                href={"/pricing"}
              >
                Purchase a plan
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Payments;
