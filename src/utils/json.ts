export const isJSONString = (string: string) => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
};
