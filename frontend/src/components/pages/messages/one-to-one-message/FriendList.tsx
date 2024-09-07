import React, { useState, useEffect, useContext, useCallback } from "react";
import { SocketContext } from "@/context/SocketContext";
import {
  useGetMyChatFriendsQuery,
  useLoggedInUserQuery,
} from "@/features/user";
import {
  IChatFriend,
  IMessagePayloadForSocket,
} from "@/interfaces/message.interface";
import { IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/router";
import { MdMessage } from "react-icons/md";
import FriendListSkeleton from "@/components/skeletons/FriendListSkeleton";

const FriendList = () => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const {
    data: usersList,
    isLoading: isFriendsLoading,
    refetch,
  } = useGetMyChatFriendsQuery(user?.id);
  const router = useRouter();
  const { query } = router;

  const participantId = query?.participantId as string;
  const participantName = query?.name as string;
  const participantProfilePicture = query?.profile_picture as string;

  const [friends, setFriends] = useState<IChatFriend[]>([]);
  const [currentFriend, setCurrentFriend] = useState<IChatFriend | null>(null);
  const [onTypingFriends, setOnTypingFriends] = useState<string[]>([]);

  // Initialize friends and currentFriend state
  useEffect(() => {
    if (usersList?.data) {
      setFriends(
        usersList.data.filter(
          (friend: IChatFriend) => friend.id !== participantId
        )
      );
      setCurrentFriend(
        usersList.data.find((user: IUser) => user.id === participantId) || null
      );
    }
  }, [usersList, participantId]);

  // Handle selecting a user
  const handleSelectUser = (selectedUser: IChatFriend) => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== selectedUser.id)
    );
    router.push(
      `/messages/chats/${selectedUser.id}?participantId=${selectedUser.id}&name=${selectedUser.name}&email=${selectedUser.email}&profile_picture=${selectedUser.profile_picture}`
    );
  };

  // Handle typing and stop-typing events
  const handleTyping = useCallback((senderId: string, isTyping: boolean) => {
    setOnTypingFriends((prev) => {
      const typingSet = new Set(prev);
      if (isTyping) {
        typingSet.add(senderId);
      } else {
        typingSet.delete(senderId);
      }
      return Array.from(typingSet);
    });
  }, []);

  // socket event listeners
  useEffect(() => {
    socket?.on("typing-message", (senderId: string) =>
      handleTyping(senderId, true)
    );
    socket?.on("stop-typing-message", (senderId: string) =>
      handleTyping(senderId, false)
    );

<<<<<<< HEAD
    return () => {
=======
    socket?.on("one-to-one-message", (data: IMessagePayloadForSocket) => {
      const conversionId = `${user.id}&${query?.participantId}`;
      if (conversionId.toString() !== data?.conversationId.toString()) {
        // refetch friends
        console.log("Refetch friends");
        refetch();
      }
    });

    return () => {
      socket?.off("one-to-one-message", () => {});
>>>>>>> 0180cf08ac2da4946a4bd2db995b5ed846f5775f
      socket?.off("typing-message");
      socket?.off("stop-typing-message");
    };
  }, [socket, handleTyping]);

  return (
<<<<<<< HEAD
    <ul className="flex flex-col gap-1 mt-1 h-[92vh]">
      {participantId && (
        <li className="flex items-center gap-2 p-[6.5px] bg-blue-500 text-white border-b border-s-2 border-gray-300">
          {participantProfilePicture ? (
            <img
              className="h-10 w-10 rounded-full ring-2"
              src={participantProfilePicture}
              alt="profile"
            />
          ) : (
            <h3 className="h-10 w-10 text-black text-3xl rounded-full ring-2 flex justify-center items-center">
              {participantName?.slice(0, 1)?.toUpperCase()}
            </h3>
          )}
          <div>
            <h2 className="text-sm lg:text-md font-bold -mb-2">
              {participantName}
            </h2>
            <small className="text-[10px] lg:text-md">
              {onTypingFriends.includes(participantId)
                ? "Typing..."
                : currentFriend?.lastMessage?.text
                ? `${
                    currentFriend.lastMessage.text.length > 20
                      ? currentFriend.lastMessage.text.slice(0, 20) + "..."
                      : currentFriend.lastMessage.text
                  }`
                : "Files"}
            </small>
          </div>
        </li>
      )}

      {friends.map((friend: IChatFriend) => (
        <li
          key={friend.id}
          onClick={() => handleSelectUser(friend)}
          className="flex items-center gap-2 p-[6.5px] cursor-pointer lg:bg-gray-100 border-b border-s-2 border-gray-300"
        >
          {friend.profile_picture ? (
            <img
              className="h-10 w-10 rounded-full ring-2"
              src={friend.profile_picture}
              alt="profile"
            />
          ) : (
            <h3 className="h-10 w-10 text-black text-3xl rounded-full ring-2 flex justify-center items-center">
              {friend.name.slice(0, 1).toUpperCase()}
            </h3>
          )}

          <div className="flex justify-between flex-col gap-2">
            <h2 className="text-sm lg:text-md font-bold -mb-2">
              {friend.name}
            </h2>
            <p>
              {onTypingFriends.includes(friend.id) ? (
                <small className="text-green-400 text-md font-serif">
                  Typing...
                </small>
              ) : (
                <small>
                  {friend.lastMessage?.text
                    ? `${
                        friend.lastMessage.text.length > 20
                          ? friend.lastMessage.text.slice(0, 20) + "..."
                          : friend.lastMessage.text
                      }`
                    : "No text"}
                </small>
              )}
            </p>
          </div>
        </li>
      ))}

      {friends.length <= 0 && (
        <main className="block lg:hidden">
          <div className="flex-grow flex flex-col justify-center items-center h-[90vh] w-full bg-white  shadow-lg p-8 ">
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
          </div>
        </main>
=======
    <>
      {isFriendsLoading ? (
        <FriendListSkeleton />
      ) : (
        <>
          <ul className="flex flex-col gap-1 mt-1 h-screen mb-72 lg:mb-0 lg:h-[92vh]">
            {participantId && (
              <li className="flex items-center gap-2 p-[6.5px] bg-blue-500 text-white border-b border-s-2 border-gray-300">
                {participantProfilePicture ? (
                  <img
                    className="h-10 w-10 rounded-full ring-2"
                    src={participantProfilePicture}
                    alt="profile"
                  />
                ) : (
                  <h3 className="h-10 w-10 text-black text-3xl rounded-full ring-2 flex justify-center items-center">
                    {participantName?.slice(0, 1)?.toUpperCase()}
                  </h3>
                )}
                <div>
                  <h2 className="text-sm lg:text-md font-bold -mb-2">
                    {participantName}
                  </h2>
                  <small className="text-[10px] lg:text-md">
                    {onTypingFriends.includes(participantId)
                      ? "Typing..."
                      : currentFriend?.lastMessage?.text
                      ? `${
                          currentFriend.lastMessage.text.length > 20
                            ? currentFriend.lastMessage.text.slice(0, 20) +
                              "..."
                            : currentFriend.lastMessage.text
                        }`
                      : "Files"}
                  </small>
                </div>
              </li>
            )}
            {friends?.length > 0 && (
              <>
                {friends.map((friend: IChatFriend) => (
                  <li
                    key={friend.id}
                    onClick={() => handleSelectUser(friend)}
                    className="flex items-center gap-2 p-[6.5px] cursor-pointer lg:bg-gray-100 border-b border-s-2 border-gray-300"
                  >
                    {friend.profile_picture ? (
                      <img
                        className="h-10 w-10 rounded-full ring-2"
                        src={friend.profile_picture}
                        alt="profile"
                      />
                    ) : (
                      <h3 className="h-10 w-10 text-black text-3xl rounded-full ring-2 flex justify-center items-center">
                        {friend.name.slice(0, 1).toUpperCase()}
                      </h3>
                    )}

                    <div className="flex justify-between flex-col gap-2">
                      <h2 className="text-sm lg:text-md font-bold -mb-2">
                        {friend.name}
                      </h2>
                      <p>
                        {onTypingFriends.includes(friend.id) ? (
                          <small className="text-green-400 text-md font-serif">
                            Typing...
                          </small>
                        ) : (
                          <small>
                            {friend.lastMessage?.text
                              ? `${
                                  friend.lastMessage.text.length > 20
                                    ? friend.lastMessage.text.slice(0, 20) +
                                      "..."
                                    : friend.lastMessage.text
                                }`
                              : "No text"}
                          </small>
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
          {friends?.length <= 0 && (
            <>
              <main className="block lg:hidden">
                <div className="flex-grow flex flex-col justify-center items-center h-[90vh] w-full bg-white  shadow-lg p-8 ">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      Welcome to your Messages
                    </h1>
                    <p className="text-gray-600 mb-6">
                      Start a conversation with your team members to collaborate
                      and keep track of your projects.
                    </p>
                    <button className="">
                      <MdMessage className="text-6xl text-blue-500 mb-4" />
                    </button>
                  </div>
                </div>
              </main>
              <div className="hidden lg:block w-full h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <h4 className="text-2xl font-semibold">No Chat Found!</h4>
                </div>
              </div>
            </>
          )}
        </>
>>>>>>> 0180cf08ac2da4946a4bd2db995b5ed846f5775f
      )}
    </>
  );
};

export default FriendList;
