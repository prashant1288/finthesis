export interface IProduct {
        id: number;
        ShortName: string;
        Name: string;
        Description: string;
        Image: string;
        Category: string;
        Price: number;
        Rating: number
}

// export class Product implements IProduct {
//     constructor(
//         public id: number = 0,
//         public ShortName: string = '',
//         public Name: string = '',
//         public Description: string = '',
//         public Image: string = '',
//         public Category: string = '',
//         public Price: number = 0,
//         public Rating: number = 0
//     ) { }
// }
