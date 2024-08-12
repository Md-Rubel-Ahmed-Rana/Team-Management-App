const extractCloudinaryPublicId = (url: string) => {
  const regex = /public_id=([^?]+)/;
  const match: any = url.match(regex);
  const public_id = match[1] as string;
  return public_id;
};

export default extractCloudinaryPublicId;
