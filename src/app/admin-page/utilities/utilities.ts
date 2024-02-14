import {map} from "rxjs";

export const deleteFunction = (service: any, id: number, items: Array<any>) => {
  return service.delete(id)
    .pipe(map(() => {
      items = items.filter(item => item.id!=id);
      return items;
    }))
}
