import React, { useState, useEffect } from "react";

const MessageSkeleton = () => {
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
          {[1, 2, 3, 4, 5, 6].map((message) => (
            <div
              key={message}
              className="w-full border-gray-300  bg-white border-b py-3"
            >
              <div className="flex justify-between mb-5">
                <div className="w-full flex items-center gap-1 lg:gap-2">
                  <Skeleton.Avatar active size="large" shape="circle" />
                  <div className="w-full flex flex-col gap-1">
                    <Skeleton
                      active
                      title={false}
                      paragraph={{ rows: 1 }}
                      className="w-[140px] lg:w-[400px]"
                    />
                    <Skeleton
                      active
                      title={false}
                      paragraph={{ rows: 1 }}
                      className="w-[100px] lg:w-[200px]"
                    />
                  </div>
                </div>

                <div className="flex gap-1 lg:gap-2">
                  <Skeleton.Button active size="small" shape="circle" />
                  <Skeleton.Button active size="small" shape="circle" />
                </div>
              </div>
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 2 }}
                className="w-[140px] lg:w-[500px]"
              />
              <div className="flex gap-2 mt-2">
                <div className="flex flex-col justify-center items-center gap-1 mt-2">
                  <Skeleton.Image active size={64} />
                  <Skeleton.Button active size="small" shape="circle" />
                </div>
                <div className="flex flex-col justify-center items-center gap-1 mt-2">
                  <Skeleton.Image active size={64} />
                  <Skeleton.Button active size="small" shape="circle" />
                </div>
              </div>
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 1 }}
                className="w-[100px] lg:w-[200px] mt-[20px]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageSkeleton;
