import { Entity } from './Entity';
import { ICreateProps } from './ICreateProps';
import { UniqueEntityID } from './UniqueEntityID';
declare abstract class AggregateRoot<T> extends Entity<T> {
    get id(): UniqueEntityID;
    static create<T, U>(params: ICreateProps<U>, Clazz: new (props: U, id?: UniqueEntityID | string) => T): T;
}
export { AggregateRoot };
//# sourceMappingURL=AggregateRoot.d.ts.map