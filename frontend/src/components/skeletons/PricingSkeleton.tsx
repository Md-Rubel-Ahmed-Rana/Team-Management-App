import React, { useState, useEffect } from "react";

const PricingSkeleton = () => {
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
    <div className="flex justify-center">
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100"
            >
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
          ))}
        </div>
      )}
    </div>
  );
};

export default PricingSkeleton;
