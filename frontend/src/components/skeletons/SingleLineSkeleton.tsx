import React, { useEffect, useState } from "react";

const SingleLineSkeleton = () => {
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
    <Skeleton
      active
      title={false}
      paragraph={{ rows: 1 }}
      style={{ width: "100%" }}
    />
  );
};

export default SingleLineSkeleton;
