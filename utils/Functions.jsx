export const _char_price = '€';
export const _measure_grams = "g";
export const _measure_milliliters = "ml";





export const FloorValue = (value) => { return Math.floor(value * Math.pow(10, 2)) / Math.pow(10, 2); }
export const GetPrice = (value) => { return `${FloorValue(value).toFixed(2)}${_char_price}`; }

export function getHoursNMinuts_FromMinutes(minutes) {
  return {
    h: parseInt(minutes / 60),
    m: parseInt(minutes % 60),
  }
}
export function getTimeText_FromMinutes(minutes) {
  const hm = getHoursNMinuts_FromMinutes(minutes);
  const h = hm.h.toString().padStart(2, '0');
  const m = hm.m.toString().padStart(2, '0');
  return `${h}:${m}`;
}
export function getDurationText_FromMinuts(minutes) {
  const hm = getHoursNMinuts_FromMinutes(minutes);

  let h = hm.h === 0 ? "" : hm.h.toString() + "h";
  let m = hm.m === 0 ? "" : hm.m.toString() + "min";

  return `${h}${m}`;
}

export const getPhysicalState = (isSolid) => {
  return isSolid ? _measure_grams : _measure_milliliters
}





export const make_ingredient = (
  recipeId, label, isSolid, unit_price, unit_weight, servings, servings_fav,
  nut_calories, nut_fats, nut_saturates, nut_carbs, nut_sugars, nut_protein, nut_fiber, nut_salt
) => {

  const servings_ = servings.map((doc) => ({
    amount: FloorValue(parseFloat(doc.amount)),
    label: doc.label,
  }));

  const data = {
    recipeId: recipeId,
    label: label,
    isSolid: isSolid,
    unit_price: parseFloat(unit_price),
    unit_weight: parseFloat(unit_weight),
    servings: servings_,
    servings_fav: servings_fav,
    nut_calories: parseFloat(nut_calories),
    nut_fats: parseFloat(nut_fats),
    nut_saturates: parseFloat(nut_saturates),
    nut_carbs: parseFloat(nut_carbs),
    nut_sugars: parseFloat(nut_sugars),
    nut_protein: parseFloat(nut_protein),
    nut_fiber: parseFloat(nut_fiber),
    nut_salt: parseFloat(nut_salt),
  }
  return data;
}
export const make_recipe = (label, isSolid, servings, servings_fav, ingredietData) => {
  const servings_ = servings.map((doc) => ({
    amount: FloorValue(parseFloat(doc.amount)),
    label: doc.label,
  }));

  const ingredietData_ = ingredietData.map((doc) => ({
    amount: FloorValue(doc.amount),
    ingredientId: doc.ingredientId,
  }));

  const data = {
    label: label,
    isSolid: isSolid,
    servings: servings_,
    servings_fav: servings_fav,
    ingredients: ingredietData_,
  }
  return data;
}
export const make_meal = (label, ingredietData) => {
  const ingredietData_ = ingredietData.map((doc) => ({
    amount: FloorValue(doc.amount),
    ingredientId: doc.ingredientId,
  }));

  const data = {
    label: label,
    ingredients: ingredietData_,
  }
  return data;
}





export const getIngredientFromRecipe = (ingredients, servings, servings_fav, recipeId, label, isSolid) => {
  let unit_price = 0;
  let unit_weight = 0;
  let nut_calories = 0;
  let nut_fats = 0;
  let nut_saturates = 0;
  let nut_carbs = 0;
  let nut_sugars = 0;
  let nut_protein = 0;
  let nut_fiber = 0;
  let nut_salt = 0;

  ingredients.forEach(element => {
    const amount = parseFloat(element.amount);
    const ingredient = element.ingredient;
    const ingUnitWeight = ingredient.unit_weight;
    const ingUnitPrice = ingredient.unit_price;

    unit_price += parseFloat(amount * ingUnitPrice / ingUnitWeight);
    unit_weight += parseFloat(amount);

    nut_calories += parseFloat(amount * ingredient.nut_calories);
    nut_fats += parseFloat(amount * ingredient.nut_fats);
    nut_saturates += parseFloat(amount * ingredient.nut_saturates);
    nut_carbs += parseFloat(amount * ingredient.nut_carbs);
    nut_sugars += parseFloat(amount * ingredient.nut_sugars);
    nut_protein += parseFloat(amount * ingredient.nut_protein);
    nut_fiber += parseFloat(amount * ingredient.nut_fiber);
    nut_salt += parseFloat(amount * ingredient.nut_salt);
  });

  const servings_ = servings.map((doc) => ({
    amount: unit_weight / doc.amount,
    label: doc.label
  }));

  return (make_ingredient(
    recipeId,
    label,
    isSolid,
    FloorValue(unit_price),
    FloorValue(unit_weight),
    servings_,
    servings_fav,
    FloorValue(nut_calories) / unit_weight,
    FloorValue(nut_fats) / unit_weight,
    FloorValue(nut_saturates) / unit_weight,
    FloorValue(nut_carbs) / unit_weight,
    FloorValue(nut_sugars) / unit_weight,
    FloorValue(nut_protein) / unit_weight,
    FloorValue(nut_fiber) / unit_weight,
    FloorValue(nut_salt) / unit_weight,
  ))
}