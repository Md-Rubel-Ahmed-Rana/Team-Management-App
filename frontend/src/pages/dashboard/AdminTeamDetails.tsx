// src/components/TeamsPage.js
import React from "react";
import { Link } from "react-router-dom";

const AdminTeamDetails = ({ team }: { team: any }) => {
  const {
    _id,
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
    <div className="p-4 border-2 border-blue-300 rounded-lg">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <div className="mt-4">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="mt-4">
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
      <div className="mt-4">
        <Link
          to={`/edit-team/${_id}`}
          state={{ team: team }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Edit Team
        </Link>
      </div>
    </div>
  );
};

export default AdminTeamDetails;
