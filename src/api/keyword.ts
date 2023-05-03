import React from 'react'
import { IKeyword } from 'src/types/keyword';
import { client } from 'src/utils/fetch';

const fetchKeyword = async (keyword:string):Promise<Array<IKeyword>>=>{
  if(!keyword) return [];
  try{
    const {data} = await client.get(`/api/v1/search-conditions/?name=${keyword}`);
    return data
  }catch(e:any){
    throw new Error(e);
  }
}

const keywordApi = {
  fetchKeyword
}

export default keywordApi