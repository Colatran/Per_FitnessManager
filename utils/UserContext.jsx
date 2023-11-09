import React, { createContext, useEffect, useState } from 'react';
import { db, exercises, ref_status } from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';



const ref_exercises = collection(db, exercises);



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [status, setStatus] = useState(70.0);
  const [exerciseDocs, setExerciseDocs] = useState([]);


/*
  useEffect(() => {
    return onSnapshot(ref_status, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...data.data() }));
      setStatus(data[0]);
    });
  }, []);
*/
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




  const getExerciseName = (key) => {
    const foundObject = exerciseDocs.find(obj => obj.id === key);
    return foundObject.name;
  }



  return (
    <UserContext.Provider
      value={{
        exerciseDocs,   setExerciseDocs,

        getExerciseName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};