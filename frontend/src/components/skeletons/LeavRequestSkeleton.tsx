import React, { useState, useEffect } from "react";

const LeaveRequestSkeleton = () => {
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
                className="border-gray-300 rounded-lg bg-white p-2 flex gap-4"
              >
                <div>
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 2 }}
                    className="w-[140px] lg:w-[500px]"
                  />
                  <div className="flex justify-between mt-3 lg:gap-2">
                    <Skeleton.Button active size="small" />
                    <Skeleton.Button active size="small" />
                  </div>
                </div>
              </div>
              <hr className="my-4" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveRequestSkeleton;
