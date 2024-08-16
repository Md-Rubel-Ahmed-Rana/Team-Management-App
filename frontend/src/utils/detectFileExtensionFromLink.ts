const detectFileExtensionFromLink = (url: string): string => {
  const regex = /extension=([^?]+)/;
  const match: any = url.match(regex);
  const extension = match[1] as string;
  return extension;
};

export default detectFileExtensionFromLink;
