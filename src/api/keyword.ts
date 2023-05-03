import React from 'react'
import { client } from 'src/utils/fetch';

const fetchKeyword = async (keyword:string)=>{
  try{
    const {data} = await client.get(`/?name=${keyword}`);
    return data
  }catch(e:any){
    throw new Error(e);
  }
}

const keywordApi = {
  fetchKeyword
}

export default keywordApi