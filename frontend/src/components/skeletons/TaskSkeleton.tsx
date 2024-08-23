import React, { useState, useEffect } from "react";

const TaskSkeleton = () => {
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
    <div className="flex justify-between mt-5 w-12/12 lg:w-11/12 mx-auto">
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[1, 2, 3, 4, 5, 6].map((task) => (
            <div
              key={task}
              className="w-full p-4 border-gray-300 rounded-lg bg-white shadow-md"
            >
              <div className="flex justify-between mb-4">
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "200px" }}
                />
                <Skeleton.Button active size="small" />
              </div>
              <Skeleton active paragraph={{ rows: 3 }} />
              <div className="flex items-center gap-3">
                <Skeleton.Avatar active size="large" shape="circle" />
                <Skeleton
                  active
                  paragraph={{ rows: 0 }}
                  style={{ marginTop: "30px" }}
                />
              </div>
              <Skeleton
                active
                paragraph={{ rows: 0 }}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskSkeleton;
