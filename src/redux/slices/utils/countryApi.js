import apiService from "../../../config/apiService"

export const getCountry = async()=>{
   try {
     const res = await apiService.get('all_countries')
     return res
   } catch (error) {
    console.log('coutry error', error);
   }
}