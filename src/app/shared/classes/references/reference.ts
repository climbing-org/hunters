export class Reference<T> {

  static list<T>(data: { [key: number]: T }): T[] {
    const list: T[] = [];
    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        const value: T = data[k];
        list.push(value);
      }
    }
    return list;
  }

  static get<T>(key: any, data: { [key: number]: T }): T {
    return data[key];
  }

}
