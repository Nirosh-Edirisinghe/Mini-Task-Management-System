export const formatStatus = (status) => {
  return status
    .toLowerCase()               // todo → todo
    .replace("_", " ")           // in_progress → in progress
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize words
};