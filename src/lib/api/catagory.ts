import api from "./api"


export async function getCatagoryData(){
    const res=await api.get('/category/get-all')
    return res.data
}
    