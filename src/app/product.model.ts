// export interface Product {  
//     id: any;  
//     name: string;  
//     category: string; 
//     categories : string[] ;
//     description: string;  
//     image : string;
//     price : Number;
//     imagearr : [];
//     attributes : {
//       color : [],
//       size : []
//     };
//     selectedSize : string;
//     selectedColor : string;
//     quantity: number;
//     instock : Boolean;
//     managestock : Boolean
//   }  
  // product.model.ts
export interface Product {
  id: any;
  name: string;
  price: number;
  category: string;

  description: string;
  image: string;
  imagearr: { image: string; thumbImage: string }[];
  attributes: {
    color: { id: number; value: string }[];
    size: { id: number; value: string }[];
  };
  managestock: boolean;
  Quantity : number;
  selectedSize: string; // Optional, add if applicable
  selectedColor: string; // Optional, add if applicable
  quantity: number; // Optional, add if applicable
 
}
