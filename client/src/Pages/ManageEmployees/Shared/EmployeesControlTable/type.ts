export interface Employee {
  _id: string;
  name: string;
  email: string;
  address: string;
  salary: number;
  category: 'Development' | 'IT' | 'Designing' | 'Management';
  image: string;
}
  
  export interface FetchError {
    message: string;
  }
  
 