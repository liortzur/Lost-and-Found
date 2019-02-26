import { Injectable } from '@angular/core';
import { Item, Kind, Category } from 'src/app/models/item'
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ItemService {
    private items: Item[] = [
        { 
          id: 12,
          name: "MacBook Air 13.3",
          description: "lalala",
          kind: Kind.Lost,
          category: Category.Laptops,
          color: "silver",
          create_time: new Date(),
          location: "tlv",
          username: "liortzur"},
      
          { 
            id: 14,
            name: "iPhone X",
            description: "bobobo",
            kind: Kind.Found,
            category: Category.Phones,
            color: "balck",
            create_time: new Date(),
            location: "beeri",
            username: "liortzur"},

            { 
                id: 15,
                name: "iPhone XS",
                description: "fififi",
                kind: Kind.Lost,
                category: Category.Phones,
                color: "Grey",
                create_time: new Date(),
                location: "beeri",
                username: "liortzur"}
      ];

      private itemsUpdate = new Subject<Item[]>();


    getItems(){
        return [...this.items];
    }

    getItemsByKind(kind: Kind){
        return [...this.items.filter(
            item => item.kind == kind
        )];
    }

    getItemsUpdatelistener() {
        return this.itemsUpdate.asObservable();
    }

    searchItems(sname: string, skind: Kind, scategory: Category,stime: Date){
        let item: Item[] = [
            { 
              id: 12,
              name: sname,
              description: "lalala",
              kind: skind,
              category: scategory,
              color: "silver",
              create_time: stime,
              location: "gig",
              username: "liortzur"}
          ];
        this.itemsUpdate.next([...item])
    }

}