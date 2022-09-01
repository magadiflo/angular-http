import { Company } from './company';
import { Address } from './address';

export interface User {
    id?:       number;
    name:     string;
    username: string;
    email:    string;
    address?:  Address;
    phone:    string;
    website:  string;
    company?:  Company;

    isAdmin?: boolean; //* Usando los operadores de RxJS agregamos una nueva propiedad. Propiedad que no viene del backend
    image?: string;
}
