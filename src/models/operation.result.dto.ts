export class OperationResult<T extends object>
{

    constructor()
    {
        this.success = false;
        this.message = "";
        this.data = null;
    }

    public success: boolean;
    public message: string;

    public data: T;
}