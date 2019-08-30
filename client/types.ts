export type CurrentUser = any;

export type MessageType = 'error' | 'confirm' | 'info';

export interface Message {
  id: string;
  type: MessageType;
  content: React.ReactNode;
  time: number;
}

export interface ContextState {
  currentUser: CurrentUser | null;
  modal: React.ReactNode | null;
  messages: Array<Message>;
}
