export interface KeyValue<K,V>
{
    key: K;
    value: V;
}

export class SelectItem<K,V>
{
    public value: K;
    public text: V;
}