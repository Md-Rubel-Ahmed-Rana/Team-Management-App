import { PackageDetail } from "@/interfaces/package.interface";

type Props = {
  pkg: PackageDetail;
};

const OtherPackageCard = ({ pkg }: Props) => {
  return (
    <div className="p-5 w-full flex flex-col justify-between gap-5 shadow-md">
      <div className="flex flex-col gap-2">
        <p>Name: {pkg?.plan?.name} </p>
        <p>Amount: ${pkg?.payment?.paymentAmount} </p>
        <p>Teams: {pkg?.limit?.team?.teamCount} </p>
        <p>Members: {pkg?.limit?.team?.memberCount} </p>
        <p>Projects: {pkg?.limit?.projectCount} </p>
        <p>Plan starts: {new Date(pkg.start)?.toDateString()} </p>
        <p>Plan ends: {new Date(pkg.end)?.toDateString()} </p>
      </div>
    </div>
  );
};

export default OtherPackageCard;
