import React, { useState,useEffect, useCallback } from 'react'
import { useQuery, QueryClient , QueryClientProvider,} from "@tanstack/react-query";
import axios from 'axios'
import Feed from '../Feed/Feed'

export default function Feedclobal(){
    // const queryClient = new QueryClient()
    const {data} =  useQuery(['text'],()=>
        axios({
            url:'/api/articles?limit=20&offset=0',
            method:"GET"
            })
        )
        // console.log(data)
    return(
        <div>
            {/* <QueryClientProvider client={queryClient}> */}
             {
                data && <Feed list={data.data.articles}></Feed>
             } 
            {/* </QueryClientProvider> */}
           
        </div>
    )
}