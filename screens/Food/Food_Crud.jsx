import { collection, doc, addDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import { db, food_ingredients } from '../../firebase.config';

export const ref_food_ingredients = collection(db, food_ingredients);


const ingredient_add = async (item) => {
  await addDoc(food_ingredients, item);
}
const ingredient_update = async (item) => {
  const docRef = doc(ref_food_ingredients, item.id);
  await updateDoc(docRef, item);
}
const ingredient_delete = async (item) => {
  const docRef = doc(ref_food_ingredients, item.id);
  await deleteDoc(docRef);
}