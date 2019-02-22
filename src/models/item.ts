export interface Item {
    id: number;
    name: string;
    type: string;
    expiry: string;
    isTrash: boolean;
    reminderDate?: string;
    reminderType?: string;
}