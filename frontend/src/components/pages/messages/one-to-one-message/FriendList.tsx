import { SocketContext } from "@/context/SocketContext";
import {
  useGetMyChatFriendsQuery,
  useLoggedInUserQuery,
} from "@/features/user";
import { IChatFriend } from "@/interfaces/message.interface";
import { IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { MdMessage } from "react-icons/md";

const FriendList = () => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: usersList } = useGetMyChatFriendsQuery(user?.id);
  const router = useRouter();
  const { query } = router;
  const participantId = query?.participantId as string;
  const [friends, setFriends] = useState<IChatFriend[]>(usersList?.data || []);
  const [currentFriend, setCurrentFriend] = useState<IChatFriend | null>(null);
  const [onTypingFriends, setOnTypingFriends] = useState<string[]>([]);

  useEffect(() => {
    setFriends(
      usersList?.data?.filter(
        (friend: IChatFriend) => friend?.id !== query?.participantId
      )
    );
    const currentUser = usersList?.data.find(
      (user: IUser) => user?.id === query?.participantId
    );
    setCurrentFriend(currentUser);
  }, [usersList, query?.participantId]);

  const handleSelectUser = (selectedUser: IChatFriend) => {
    setFriends((prevFriends: IChatFriend[]) =>
      prevFriends.filter(
        (friend: IChatFriend) => friend?.id !== selectedUser?.id
      )
    );

    // Navigate to the chat page
    router.push(
      `/messages/chats/${selectedUser?.id}?participantId=${selectedUser?.id}&name=${selectedUser.name}&email=${selectedUser?.email}&profile_picture=${selectedUser?.profile_picture}`
    );
  };

  // receive typing event from socket
  useEffect(() => {
    const handleMessage = (senderId: string) => {
      console.log(`This sender '${senderId}' is typing`);
      if (!onTypingFriends?.includes(senderId)) {
        setOnTypingFriends((prev: string[]) => [...prev, senderId]);
      }
    };
    socket?.on("typing-message", handleMessage);
    return () => {
      socket?.off("typing-message", handleMessage);
    };
  }, [socket]);

  // receive stop typing event from socket
  useEffect(() => {
    const handleMessage = (senderId: string) => {
      console.log(`This sender '${senderId}' has stopped typing.`);
      if (!onTypingFriends?.includes(senderId)) {
        const remaining = onTypingFriends.filter(
          (friend) => friend !== senderId
        );
        setOnTypingFriends(remaining);
      } else {
        setOnTypingFriends((prev: string[]) => [...prev, senderId]);
      }
    };
    socket?.on("stop-typing-message", handleMessage);
    return () => {
      socket?.off("stop-typing-message", handleMessage);
    };
  }, [socket]);

  return (
    <ul className="flex flex-col gap-1 mt-1 h-[92vh]">
      {query?.participantId && (
        <li className="flex items-center gap-2 p-[6.5px] bg-blue-500 text-white border-b border-s-2 border-gray-300">
          <img
            className="h-10 w-10 rounded-full ring-2"
            src={query?.profile_picture as string}
            alt="profile"
          />
          <div>
            <h2 className="text-sm lg:text-md font-bold -mb-2">
              {query?.name}
            </h2>
            <small className="text-[10px] lg:text-md">
              {onTypingFriends.includes(participantId)
                ? "Typing..."
                : currentFriend?.lastMessage?.text
                ? `${
                    currentFriend?.lastMessage?.text.length > 20
                      ? currentFriend?.lastMessage?.text.slice(0, 20) + "..."
                      : currentFriend?.lastMessage?.text
                  }`
                : "No text"}
            </small>
          </div>
        </li>
      )}

      {friends?.map((friend: IChatFriend) => (
        <li
          key={friend?.id}
          onClick={() => handleSelectUser(friend)}
          className="flex items-center gap-2 p-[6.5px] cursor-pointer lg:bg-gray-100 border-b border-s-2 border-gray-300"
        >
          <img
            className="h-10 w-10 rounded-full ring-2"
            src={friend?.profile_picture as string}
            alt="profile"
          />
          <div className="flex justify-between flex-col gap-2">
            <h2 className="text-sm lg:text-md font-bold -mb-2">
              {friend?.name}
            </h2>
            <p>
              {onTypingFriends.includes(friend?.id) ? (
                <small className="text-green-400 text-md font-serif">
                  Typing...
                </small>
              ) : (
                <small>
                  {friend?.lastMessage?.text
                    ? `${
                        friend?.lastMessage?.text.length > 20
                          ? friend?.lastMessage?.text.slice(0, 20) + "..."
                          : friend?.lastMessage?.text
                      }
                      `
                    : "No text"}
                </small>
              )}
            </p>
          </div>
        </li>
      ))}

      {friends?.length <= 0 && (
        <>
          <main className="flex-grow flex flex-col justify-center items-center h-[90vh] w-full bg-white  shadow-lg p-8 block lg:hidden">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to your Messages
              </h1>
              <p className="text-gray-600 mb-6">
                Start a conversation with your team members to collaborate and
                keep track of your projects.
              </p>
              <button className="">
                <MdMessage className="text-6xl text-blue-500 mb-4" />
              </button>
            </div>
          </main>
        </>
      )}
    </ul>
  );
};

export default FriendList;
