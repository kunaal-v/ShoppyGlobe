import { useEffect, useState } from "react";

function useFetch(url)
{
    const [data,setData]=useState(null);
    const [err,setErr]=useState(null);
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        const fetchData= async()=>{
            try{
                const response = await fetch(url,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 
                    }
                }
                );
                console.log(response);
                const result= await response.json();
                setData(result);
            }
            catch(error){
                setErr(error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();
    },[url])
    return {data,err,loading}
}
export default useFetch