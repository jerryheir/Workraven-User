import {  AsyncStorage } from "react-native";

export const storeItem = async (key, item) => {
    try {
      const jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
}

export const retrieveItem = async (key) => {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
}

export const removeItem = async (key) => {
  try {
    const removeItem =  await AsyncStorage.removeItem(key);
    return removeItem + ' was removed!';
  } catch (error) {
    console.log(error.message);
  }
  return
}

export const GenerateRandomNumber = (num) => {
  let RandomNumber = Math.floor(Math.random() * num) + 1 ;
  return RandomNumber
} // could be a floating number

export const createRandomString = () => {
  var text = "";
  var possible = "ABCDE3FGHIJKLMNPQ5RSTU2VWXY7Zabcde0fghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 11; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const shuffle = (array) => {
  const a = array.slice();

  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }

  return a;

  /*let currentIndex = array.length, temporaryValue, randomIndex;
  // The de-facto unbiased shuffle algorithm
  // Fisher-Yates a.k.a. Knuth
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;*/

}