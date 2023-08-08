import React, { createContext, useEffect, useState } from 'react';
import { db, exercises } from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';



const ref_exercises = collection(db, exercises);



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [exerciseDocs, setExerciseDocs] = useState([]);



  useEffect(() => {
    return onSnapshot(ref_exercises, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
      
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setExerciseDocs(data);
    });
  }, []);



  return (
    <UserContext.Provider
      value={{
        exerciseDocs,   setExerciseDocs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};