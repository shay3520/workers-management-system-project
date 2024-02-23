export interface AddEmployeeModalProps {
    open: boolean;
    handleClose: () => void;
    refreshEmployees: () => void;
  }
  
  export interface FormData {
    name: string;
    email: string;
    address: string;
    salary: string;
    category: string;
    image: string;
  }

  export interface Employee {
    _id: string;
    name: string;
    email: string;
    address: string;
    salary: number;
    category: 'Development' | 'IT' | 'Designing' | 'Management';
    image: string;
  }
  