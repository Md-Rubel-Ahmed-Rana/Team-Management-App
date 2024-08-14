const makeUrlFromFileObject = (fileObject: any) => {
  const {
    url,
    public_id,
    asset_id,
    version_id,
    created_at,
    bytes,
    resource_type,
    extension,
  } = fileObject;
  const dataUrl = `${url}?public_id=${public_id}?asset_id=${asset_id}?version_id=${version_id}?created_at=${created_at}?bytes=${bytes}?extension=${extension}?resource_type=${resource_type}`;
  return dataUrl;
};

export default makeUrlFromFileObject;
