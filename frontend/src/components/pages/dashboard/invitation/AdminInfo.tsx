import { IUser } from "@/interfaces/user.interface";
import dynamic from "next/dynamic";
const Meta: any = dynamic(() => import("antd/lib/card/Meta"), {
  ssr: false,
});

const Avatar: any = dynamic(() => import("antd/lib/avatar"), {
  ssr: false,
});

type Props = {
  admin: IUser;
};

const AdminInfo = ({ admin }: Props) => {
  return (
    <Meta
      avatar={<Avatar src={admin?.profile_picture} />}
      title={admin?.name}
      description={admin?.designation}
    />
  );
};

export default AdminInfo;
