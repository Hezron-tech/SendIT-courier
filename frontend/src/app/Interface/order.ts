export interface Orders {
  id: string;
  PackageName: string;
  destination: string;
  senderEmail: string;
  receiverEmail: string;
  price:number
  isDeleted:string
  transit:string
  lat:string
  long:string
  status: string;
  weight: number;
  date: string;
}
