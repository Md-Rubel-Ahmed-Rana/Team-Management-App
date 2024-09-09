import { PackageService } from "@/services/package.service";

const checkPackageAndGetCurrent = async (userId: string) => {
  const ixPackageExist = await PackageService.isPackageExist(userId);
  return ixPackageExist?.packages?.find((pkg) => pkg?.isCurrent === true);
};

export default checkPackageAndGetCurrent;
