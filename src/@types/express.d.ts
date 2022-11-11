import ""

interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

interface Client {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  cep: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
}

interface ProductData {
  value: number, 
  description: string, 
  stock: number
}

interface Product {
  productData: ProductData[]
  totalValue: number;
}

declare global {
  namespace Express {
    export interface Request {
      usuario: Partial<User>,
      cliente: Partial<Client>,
      productData: Partial<Product>,
      productImgUrl: string
    }
  }
}