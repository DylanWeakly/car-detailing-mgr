export interface Job {
  id?: string;
  userId: string;
  customerName: string;
  vehicle: string;
  serviceType: string;
  dateCompleted: string;
  price: number;
  notes?: string;
  createdAt: number;
}
