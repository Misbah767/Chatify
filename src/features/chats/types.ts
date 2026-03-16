export type Tab = "chats" | "contacts" | "status";

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
}

export interface Contact {
  id: string;
  name: string;
}

export interface Status {
  id: string;
  name: string;
  status: string;
}
