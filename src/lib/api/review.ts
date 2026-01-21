import api from "./api";


export async function singleReviewProduct(id:string) {
   try{
    const res= await api.get(`/review/review-by-product/${id}`);
    return res.data;
   }catch(error){
    if(error instanceof Error){
        throw new Error(error.message || "Fail to Fetch Your Profile please check everyting")
    }
   } 
    
}
