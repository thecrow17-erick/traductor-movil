import { traslateApi } from "../api";
import { ITransalateResponse } from "../interface";


export const traslateQuery = async(data: string):Promise<ITransalateResponse | undefined> =>{
  try {
    const res = await traslateApi.post<ITransalateResponse>('translate',data)
    return res.data;
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
  }  
}