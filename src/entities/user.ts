import { Replace } from "@src/helpers/Replace";

export interface UserProps {
  id: number;
  username: string;
  password: string;
  numeric?: string;
  createdAt: Date;
}

export class User {
  private _id: number;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id: number) {
    this._id = id;
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get username() {
    return this.props.username;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get password() {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get numeric(): string | null | undefined {
    return this.props.numeric;
  }
}
