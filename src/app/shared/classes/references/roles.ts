import { Reference } from './reference';

interface Role {
    id: number;
    name: string;
    toString?(): string;
}

export default class Roles {

  static TRAINER = 1;
  static SPORTSMAN = 2;
  static JUDGE = 3;
  static MODERATOR = 4;
  static ADMIN = 5;

  private static data: { [key: string]: Role } = {
    [Roles.TRAINER]: {
      id       : Roles.TRAINER,
      name     : 'trainer',
      toString() {
        return this.name;
      }
    },
      [Roles.SPORTSMAN]: {
          id       : Roles.SPORTSMAN,
          name     : 'sportsman',
          toString() {
              return this.name;
          }
      },
      [Roles.JUDGE]: {
          id       : Roles.JUDGE,
          name     : 'judge',
          toString() {
              return this.name;
          }
      },
      [Roles.MODERATOR]: {
          id       : Roles.MODERATOR,
          name     : 'moderator',
          toString() {
              return this.name;
          }
      },
      [Roles.ADMIN]: {
          id       : Roles.ADMIN,
          name     : 'admin',
          toString() {
              return this.name;
          }
      },
  };

  public static list() {
    return Reference.list<Role>(this.data);
  }

  public static get(key: number | string) {
    return Reference.get<Role>(key, this.data);
  }


}
