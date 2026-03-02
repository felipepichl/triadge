import { UniqueEntityID } from './UniqueEntityID';
declare abstract class Entity<T> {
    protected readonly _id: UniqueEntityID;
    protected readonly props: T;
    constructor(props: T, id?: UniqueEntityID);
    equals(object?: Entity<T>): boolean;
}
export { Entity };
//# sourceMappingURL=Entity.d.ts.map