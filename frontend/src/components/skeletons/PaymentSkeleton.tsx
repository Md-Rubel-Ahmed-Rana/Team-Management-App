import React, { useState, useEffect } from "react";

const PaymentSkeleton = () => {
  const [Skeleton, setSkeleton] = useState<any>(null);

  useEffect(() => {
    import("antd/lib/skeleton")
      .then((module: any) => setSkeleton(() => module.default))
      .catch((err) => console.error("Failed to load Skeleton", err));
  }, []);

  if (!Skeleton) {
    return null;
  }

  return (
    <div className="w-12/12">
      <div className="w-full">
        <div className="flex justify-center items-center w-1/2 my-5">
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 1 }}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((invitation) => (
            <div
              key={invitation}
              className="border-gray-300 p-5 w-full  rounded-md bg-white"
            >
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 3 }}
                className="w-full"
              />
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 3 }}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
      <hr className="mt-10" />
      <div className="w-full mt-10">
        <div className="flex justify-center items-center w-1/2 my-5">
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 1 }}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((invitation) => (
            <div
              key={invitation}
              className="border-gray-300  p-5 w-full rounded-md bg-white"
            >
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 3 }}
                className="w-full"
              />
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 3 }}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentSkeleton;
