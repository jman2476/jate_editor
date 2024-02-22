import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// create transaction to update the database
const transact = initdb.transaction('jate', 'readwrite')

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  await initdb.put('jate', content, 1)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // jate get index of 1
  const text = await initdb.get('jate', 1)
  return text
}

initdb();
