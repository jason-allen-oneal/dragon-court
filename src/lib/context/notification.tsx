import { createContext, PropsWithChildren, useContext } from "react";
import { toast, ToastOptions } from "react-toastify";

type Callback = () => void;
type Options = {
  type?: string;
  onClose?: () => void;
};

function makeToast(type: string, content: string, callback?: Callback) {
  let options: Options = {
    type: type,
  };
  if (callback != undefined) {
    options.onClose = () => callback();
  }
  console.log('toast opts', JSON.stringify(options));
  console.log('toast content', JSON.stringify(content));
  toast(content, options as ToastOptions);
}

interface INotificationContextProps {
  toast: (type: string, content: string, callback?: Callback) => void;
}

const defaults = {
  toast: makeToast,
};

export const NotificationContext =
  createContext<INotificationContextProps>(defaults);

export const NotificationProvider = (props: PropsWithChildren) => {
  return (
    <NotificationContext.Provider
      value={{
        toast: makeToast
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export function useNotification() {
  return useContext(NotificationContext);
}
