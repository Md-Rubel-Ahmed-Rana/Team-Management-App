import React, { useState, useEffect } from "react";

const ProjectSkeleton = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {loading &&
        [1, 2, 3, 4, 5, 6, 7, 8].map((card) => (
          <div
            key={card}
            className="border border-gray-500 p-2 lg:p-5 rounded-md flex flex-col justify-between gap-1"
          >
            <div className="font-semibold flex justify-between items-start relative">
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 1, width: "95%" }}
              />
              <Skeleton.Button active size="small" shape="circle" />
            </div>
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: "85%" }}
            />
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: "90%" }}
            />
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: "50%" }}
            />
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: "90%" }}
            />
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: "80%" }}
            />
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: "70%" }}
            />

            <Skeleton.Button
              active
              size="small"
              style={{ width: "100%", marginTop: "10px" }}
            />
          </div>
        ))}
    </div>
  );
};

export default ProjectSkeleton;
