export interface User {
  userId: number;
  email: string;
  password: string;
  authState: boolean;
  authKey: string;
  groupId: number;
}

export interface ToDos {
  toDoId: number;
  toDo: string;
  userId: number;
  successState: boolean;
}

export interface Group {
  groupId: number;
  groupName: string;
}

export interface BoardKind {
  boardKindId: number;
  boardKind: string;
}

export interface Board {
  boardId: number;
  userId: number;
  boardKindId: number;
  title: string;
  contents: string;
}
