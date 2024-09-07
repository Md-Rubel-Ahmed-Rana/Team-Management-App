import React, { useEffect, useState } from "react";

const FriendListSkeleton = () => {
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
    <div className="flex flex-col gap-2 ml-2 mt-2">
      {Array.from({ length: 10 }).map((item, index) => (
        <div key={index} className="flex items-center gap-4 mb-4 w-full">
          <div>
            <Skeleton.Avatar active size={50} shape="circle" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1 }}
              style={{ width: "100%" }}
            />
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1 }}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendListSkeleton;
