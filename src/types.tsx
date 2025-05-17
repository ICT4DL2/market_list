export interface Item {
    id: string;
    name: string;
    quantity: number;
    price: number;
    unit: string;
    totalPrice: number;
}

export interface List {
  id: string;
  title: string;
  creation_date: Date;
  isBudgetChecked: boolean;
  budget?: number;
  totalPrice: number;
  items: Item[];
}
