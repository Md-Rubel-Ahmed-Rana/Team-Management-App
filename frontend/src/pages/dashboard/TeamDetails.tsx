const TeamDetails = ({ team }: { team: any }) => {
  const {
    name,
    category,
    description,
    image,
    admin,
    activeMembers,
    pendingMembers,
    createdAt,
  } = team;

  return (
    <div className="p-4 flex gap-5 shadow-md rounded-lg">
      <div className="w-2/6">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <div className="mt-4">
          <img
            src={image}
            alt={name}
            className="w-full h-48  border-2 p-4 rounded-lg"
          />
        </div>
      </div>
      <div className="w-4/5  flex flex-col gap-3">
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <p>
          <strong>Admin:</strong> {admin?.name} ({admin?.email})
        </p>
        <p>
          <strong>Active Members:</strong>{" "}
          {activeMembers?.map((member: any) => member?.name).join(", ")}
        </p>
        <p>
          <strong>Pending Members:</strong>{" "}
          {pendingMembers?.map((member: any) => member?.name).join(", ")}
        </p>
        <p>
          <strong>Created At:</strong> {createdAt?.toString()?.slice(0, 10)}
        </p>
      </div>
    </div>
  );
};

export default TeamDetails;
