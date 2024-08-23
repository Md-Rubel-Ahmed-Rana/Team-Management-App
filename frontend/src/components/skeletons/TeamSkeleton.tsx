import React, { useState, useEffect } from "react";

const TeamSkeleton = () => {
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
    <div className="flex justify-between mt-5 w-12/12 ">
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <div
              key={card}
              className="w-full p-4 border-gray-300 rounded-lg bg-white shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <Skeleton.Avatar active size="large" shape="circle" />
                <Skeleton.Button active size="small" shape="circle" />
              </div>
              <Skeleton active title={false} paragraph={{ rows: 1 }} />
              <Skeleton active title={false} paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 4 }} />
              <div className="flex justify-between gap-2 mt-4">
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "150px" }}
                />
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "150px" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSkeleton;
