import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notifications";
import messageReducer from "./slices/messages";
import userReducer from "./slices/user";
import userSettingsReducer from "./slices/userSettings";
import eventReducer from "./slices/events";
import purchaseAgreementsReducer from "./slices/purchaseAgreements";
import propertiesReducer from "./slices/properties";
import groupsReducer from "./slices/groups";
import chatsReducer from "./slices/chats";
import offersReducer from "./slices/offers";
import sellerDisclosureReducer from "./slices/sellerDisclosure";
import likedPropertiesReducer from "./slices/likedProperties";
import documentsReducer from "./slices/documents";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  likedPropertiesReducer,
  notificationReducer,
  messageReducer,
  userReducer,
  userSettingsReducer,
  eventReducer,
  purchaseAgreementsReducer,
  propertiesReducer,
  groupsReducer,
  chatsReducer,
  offersReducer,
  sellerDisclosureReducer,
  documentsReducer
});

let store: any;

export function initializeStore(preloadedState: Partial<RootState> = {}) {
  let _store =
    store ??
    configureStore({
      reducer: rootReducer,
      preloadedState,
    });

  // After navigating to a page with an initial Redux state,
  // merge that state with the current state in the store,
  // and create a new store
  if (preloadedState && store) {
    _store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        ...store.getState(),
        ...preloadedState,
      },
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

// idk why we do this but typescript gets mad if we don't :)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;