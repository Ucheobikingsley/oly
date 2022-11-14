import localforage from "localforage";

export const getStoreInstance = (
  storeName: string,
  dbName = "local-store",
  description = "store description"
): LocalForage => {
  return localforage.createInstance({
    name: dbName,
    storeName,
    driver: [localforage.INDEXEDDB, localforage.WEBSQL],
    description,
    size: 100 * 1024 * 1024,
  });
};
