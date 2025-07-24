// import type {
//   TCategoriesList,
//   TNotesList,
//   TTodosList,
// } from "../../shared/types/EntityTypes";
// import {
//   getNotesLS,
//   getTodosLS,
//   setCategoriesLS,
//   setNotesLS,
//   setTodosLS,
// } from "../../shared/utils/localStorage";

// type TStore = {
//   notes: TNotesList | null;
//   categories: TCategoriesList | null;
//   todos: TTodosList | null;
// };

// type TSubscribe = {
//   [K in keyof TStore]: {
//     type: K;
//     cb: (newValue: TStore[K]) => void;
//   };
// }[keyof TStore];

// const Store: TStore = {
//   notes: null,
//   categories: null,
//   todos: null,
// };

// const subscribes: TSubscribe[] = [];

// export const subscribe = (subscription: TSubscribe) => {
//   subscribes.push(subscription);
// };

// export const ProxiedStore = new Proxy(Store, {
//   set(target, prop, newValue) {
//     target[prop as keyof TStore] = newValue;

//     if (prop === "notes") {
//       setNotesLS(newValue);
//     } else if (prop === "todos") {
//       setTodosLS(newValue);
//     } else if (prop === "categories") {
//       setCategoriesLS(newValue);
//     }
//     const key = prop as keyof TStore;

//     subscribes.forEach((subscribe) => {
//       if (subscribe.type === key) {
//         subscribe.cb(newValue);
//       }
//     });
//     return true;
//   },
//   get(target, prop) {
//     return target[prop as keyof TStore];
//   },
// });
// const setUpStore = () => {
//   ProxiedStore.notes = getNotesLS();
//   ProxiedStore.todos = getTodosLS();
//   ProxiedStore.categories = [{ key: "new", title: "New" }];
// };
// setUpStore();

// export const isCategoryExist = (categoryKey: string) => {
//   const categories = ProxiedStore.categories;
//   return categories?.find((category) => category.key === categoryKey);
// };
