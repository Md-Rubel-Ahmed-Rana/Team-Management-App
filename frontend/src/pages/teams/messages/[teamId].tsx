import TeamMessages from "@/components/pages/messages/TeamMessages";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const MessagesPage = () => {
  const { query } = useRouter();
  return (
    <>
      <GetHead
        title={`Messages - ${query?.team_name || "Team"}: Team Manager `}
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <TeamMessages />
    </>
  );
};

export default MessagesPage;

MessagesPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
