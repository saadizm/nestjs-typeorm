import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, ManyToOne, Column } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Comment extends AbstractEntity<Comment>{
    @Column()
    content: string;

    @ManyToOne(()=> Item, (item)=>item.comments)
    item: Item;

}