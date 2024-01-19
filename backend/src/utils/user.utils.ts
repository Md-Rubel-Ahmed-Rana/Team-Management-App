import crypto from "crypto";

export const hash = async (payload: any) => {
  return crypto
    .createHmac("sha256", process.env.HASH_SECRET as string)
    .update(payload)
    .digest("hex");
};
