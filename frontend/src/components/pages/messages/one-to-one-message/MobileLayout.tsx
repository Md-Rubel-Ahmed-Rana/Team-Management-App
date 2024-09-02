import { MdMessage } from "react-icons/md";
import SearchUser from "./SearchUser";
import FriendList from "./FriendList";
import { TiMessages } from "react-icons/ti";

const MobileLayout = () => {
  return (
    <div>
      <div className="flex justify-center items-center gap-2 p-4 lg:p-4 bg-gray-200 text-gray-800 shadow-md">
        <TiMessages className="text-3xl" />
        <h1 className="lg:text-xl font-bold ">Messages</h1>
      </div>
      <SearchUser />
      <FriendList />
    </div>
  );
};

export default MobileLayout;
