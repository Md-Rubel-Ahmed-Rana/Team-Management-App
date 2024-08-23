import React, { useState, useEffect } from "react";

const TeamDetailsSkeleton = () => {
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
    <div className="mt-5 w-12/12">
      {loading && (
        <div>
          <div className="flex gap-4 mb-4">
            <div>
              <Skeleton.Avatar active size={80} shape="circle" />
            </div>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex justify-start gap-2 items-center w-full">
                <Skeleton
                  active
                  title={false}
                  paragraph={{ rows: 1 }}
                  className="w-[100px] lg:w-[400px]"
                />
                <Skeleton.Button active size="small" shape="circle" />
                <Skeleton.Button active size="small" shape="circle" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton active title={false} paragraph={{ rows: 1 }} />
                <Skeleton active title={false} paragraph={{ rows: 1 }} />
              </div>
            </div>
          </div>

          <h3 className="mt-4 font-semibold">Admin</h3>
          <div className="flex items-center gap-4 mb-4 w-full">
            <div>
              <Skeleton.Avatar active size={50} shape="circle" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 1 }}
                className="w-[200px] lg:w-[400px]"
              />
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 1 }}
                className="w-[200px] lg:w-[400px]"
              />
            </div>
          </div>

          <h3 className="mt-4 font-semibold">Active Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {[1, 2, 3, 4, 5, 6].map((member) => (
              <div key={member} className="flex items-center gap-4 mb-4 w-full">
                <div>
                  <Skeleton.Avatar active size={50} shape="circle" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 1 }}
                    className="w-full lg:w-[400px]"
                  />
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 1 }}
                    className="w-full lg:w-[400px]"
                  />
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-4 font-semibold">Pending Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {[1, 2, 3, 4, 5, 6].map((member) => (
              <div key={member} className="flex items-center gap-4 mb-4 w-full">
                <div>
                  <Skeleton.Avatar active size={50} shape="circle" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 1 }}
                    className="w-full lg:w-[400px]"
                  />
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 1 }}
                    className="w-full lg:w-[400px]"
                  />
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-4 font-semibold">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <div
                key={project}
                className="w-full p-4 border-gray-300 rounded-lg bg-white shadow-md"
              >
                <div className="w-full flex justify-between">
                  <Skeleton active paragraph={{ rows: 0 }} className="w-full" />
                  <Skeleton.Button active size="small" shape="circle" />
                </div>
                <Skeleton active paragraph={{ rows: 1 }} />
                <Skeleton active paragraph={{ rows: 1 }} />
                <div className="flex justify-between mt-2">
                  <Skeleton.Button active size="small" />
                  <Skeleton.Button active size="small" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetailsSkeleton;
