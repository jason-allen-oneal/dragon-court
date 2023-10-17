import { createContext, useContext, useState, PropsWithChildren } from 'react';
import Modal from "@/components/game/Modal";

const ModalContext = createContext({
  openModal: (t: string, c: any) => {}
});

export const ModalProvider = (props: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  // handle any additional data needed with useState/useReducer
  const [title, setTitle] = useState('default title');
  const [content, setContent] = useState('');
  const [callback, setCallback] = useState<Callback | null>();
  
  const openModal = (title: string, content: any, cb: Callback | null) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
    setCallback(cb);
  };
  
  return (
    <ModalContext.Provider value={{openModal}}>
      <Modal setIsOpen={setIsOpen} isOpen={isOpen} title={title} content={content} cb={callback} />
      {props.children}
    </ModalContext.Provider>
  );
};

export function useModalContext() {
  const context = useContext(ModalContext);
  if(!context) {
    throw new Error('useModalContext must be used under <ModalContextProvider/>');
  }
  
  return context;
}