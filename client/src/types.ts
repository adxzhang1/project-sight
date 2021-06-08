export interface Goal {
  _id: string;
  title: string;
  description?: string;
}

export interface Category {
  _id: string;
  name: string;
  goals: Goal[];
}
