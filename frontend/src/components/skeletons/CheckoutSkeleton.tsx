import React, { useState, useEffect } from "react";

const CheckoutSkeleton = () => {
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
    <div className="flex justify-center">
      <div className="flex justify-center items-center flex-col lg:flex-row w-full bg-gray-100 p-4">
        <div className="w-full p-4 lg:border-r-2">
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 1 }}
            style={{ marginBottom: "30px" }}
          />
          <div className="flex justify-center">
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        </div>
        <div className="w-full p-4 border-t-2 lg:border-t-0">
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 1 }}
            style={{ marginBottom: "30px" }}
          />
          <div className="flex justify-center">
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
