const extractCloudinaryPublicId = (url: string) => {
  const regex = /public_id=([^?]+)/;
  const match: any = url.match(regex);
  if (match) {
    console.log("Remove cloudinary file");
    const public_id = match[1] as string;
    return public_id;
  } else {
    console.log("This is not  cloudinary file");
    return null;
  }
};

export default extractCloudinaryPublicId;
