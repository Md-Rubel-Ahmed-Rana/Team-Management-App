import { FaPlus } from "react-icons/fa";
import image1 from "../../../assets/teamcreation/softPro.png";
import image2 from "../../../assets/teamcreation/sechZoft.png";
import image3 from "../../../assets/teamcreation/nextGen.png";
import { useState } from "react";
import CreateTeamModal from "./CreateTeamModal";

const CreateTeam = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="my-10 p-5">
      <div className="lg:flex justify-between">
        <div>
          <h1 className="lg:text-3xl font-bold">
            Team Creation Management System
          </h1>
          <p className="text-slate-400">Existing team</p>
        </div>
        <div>
          <button
            className="flex items-center mt-3 lg:mt-0 gap-2 text-blue-400 border-2 border-blue-400 px-5 py-2 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            <FaPlus /> <small>Create a team</small>
          </button>
        </div>
      </div>
      <div className="lg:flex gap-5 lg:w-4/5 py-10">
        <div className="border p-8 rounded-md border-blue-400">
          <img src={image1} alt="" />
          <h2 className="text-2xl font-bold my-2">
            <strong>Soft</strong>
            <small>Pro</small>
          </h2>
          <h4 className="text-xl font-semibold mb-3">
            Innovation Tech Partner
          </h4>
          <p>
            Grow Your Team With Ease: Effortlessly Add Members For Increase
            Performance And Achievement
          </p>
        </div>
        <div className="border my-2 lg:my-0 p-8 rounded-md border-blue-400">
          <img src={image2} alt="" />
          <h2 className="text-2xl font-bold my-2">
            <strong>Sech</strong>
            <small>Zoft</small>
          </h2>
          <h4 className="text-xl font-semibold mb-3">IT Solution Expert</h4>
          <p>
            Grow Your Team With Ease: Effortlessly Add Members For Increase
            Performance And Achievement
          </p>
        </div>
        <div className="border p-8 rounded-md border-blue-400">
          <img src={image3} alt="" />
          <h2 className="text-2xl font-bold my-2">
            <strong>NextGen</strong>
          </h2>
          <h4 className="text-xl font-semibold mb-3">Digital Generation</h4>
          <p>
            Grow Your Team With Ease: Effortlessly Add Members For Increase
            Performance And Achievement
          </p>
        </div>
      </div>
      {isOpen && <CreateTeamModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </section>
  );
};

export default CreateTeam;
