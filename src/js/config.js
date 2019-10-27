// 36f45036bd0cccd1906b5df126cb6dc2
//5fceaf4991abaa6a5584983d5f616bfb
//fdff6ba9f057d1ace7d870abdac8752d

export const proxy = "https://cors-anywhere.herokuapp.com/";
// export var key = "fdff6ba9f057d1ace7d870abdac8752d";

export const getKey = () => {     
     const keyUser = prompt('Enter the API key from Food2Fork or Press 1 for defaultKey');
     if(keyUser){
          if(keyUser == 1){
               return "36f45036bd0cccd1906b5df126cb6dc2";
          }else if (keyUser == 2){
               return "fdff6ba9f057d1ace7d870abdac8752d";
          }else if (keyUser == 3){
               return "5fceaf4991abaa6a5584983d5f616bfb";
          }else {
               return keyUser;
          }
     }
}

export const key = getKey();