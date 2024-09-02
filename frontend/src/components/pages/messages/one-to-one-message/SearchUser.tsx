import { useGetUsersQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { GoSearch } from "react-icons/go";
const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
});

const Input: any = dynamic(() => import("antd/lib/input"), {
  ssr: false,
});

const SearchUser = () => {
  const { data } = useGetUsersQuery([]);
  const users = data?.data as IUser[];
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    const lowercasedFilter = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user?.name?.toLowerCase().includes(lowercasedFilter) ||
        user?.email?.toLowerCase().includes(lowercasedFilter) ||
        user?.department?.toLowerCase().includes(lowercasedFilter) ||
        user?.designation?.toLowerCase().includes(lowercasedFilter) ||
        user?.phoneNumber?.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, users]);

  const handleSelectUser = (user: IUser) => {
    setSearchTerm("");
    setOpenDropdown(false);
    router.push(
      `/messages/chats/${user?.id}?participantId=${user?.id}&name=${user?.name}&email=${user?.email}&profile_picture=${user?.profile_picture}`
    );
  };

  const menuItems = (
    <ul className="max-h-64 overflow-auto w-full">
      {filteredUsers?.map((user) => (
        <li
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleSelectUser(user)}
          key={user.id}
          className="flex items-center gap-2 p-[6.5px] bg-gray-500 cursor-pointer text-white border-b border-s-2 border-gray-300 hover:bg-gray-600"
        >
          <img
            className="h-10 w-10 rounded-full ring-2"
            src={user?.profile_picture as string}
            alt="profile"
          />
          <div>
            <h2 className="text-sm lg:text-md font-bold -mb-2">{user?.name}</h2>
            <small className="text-[10px] lg:text-md">
              {user?.designation}
            </small>
          </div>
        </li>
      ))}
      {filteredUsers?.length === 0 && (
        <li className="p-2 text-center text-gray-500">No users found</li>
      )}
    </ul>
  );

  return (
    <div className="relative">
      <Dropdown
        overlay={menuItems}
        trigger={["click"]}
        open={openDropdown}
        onOpenChange={(visible: any) => setOpenDropdown(visible)}
        placement="bottomLeft"
      >
        <div className="relative">
          <Input
            type="text"
            name="participant"
            id="participant"
            placeholder="Search to chat..."
            className="w-full border p-2 pr-10 focus:outline-blue-500 bg-gray-100"
            value={searchTerm}
            onChange={(e: any) => {
              setSearchTerm(e.target.value);
              setOpenDropdown(true);
            }}
            onFocus={() => setOpenDropdown(true)}
          />
          <GoSearch className="absolute right-2 top-3 text-gray-400" />
        </div>
      </Dropdown>
    </div>
  );
};

export default SearchUser;
