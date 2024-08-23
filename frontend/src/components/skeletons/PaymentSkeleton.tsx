import React, { useState, useEffect } from "react";

const PaymentSkeleton = () => {
  const [loading, setLoading] = useState(true);
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
    <div className="flex justify-between w-12/12">
      {loading && (
        <div className="grid grid-cols-1 w-full">
          {[1, 2, 3].map((invitation) => (
            <>
              <div
                key={invitation}
                className="border-gray-300 rounded-lg bg-white p-2"
              >
                <Skeleton
                  active
                  title={false}
                  paragraph={{ rows: 3 }}
                  className="w-[140px] lg:w-[500px]"
                />
                <Skeleton
                  active
                  title={false}
                  paragraph={{ rows: 3 }}
                  className="w-[140px] lg:w-[500px] mt-5"
                />
              </div>
              <hr className="my-4" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentSkeleton;
