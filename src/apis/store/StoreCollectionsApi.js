'use client';

let publishKey="pk_bf713f1adcc6ed35b4881cb9eb1cfb448f057b0fee771da4eeadf6eb0aafb740";
function StoreCollectionsApi()
{
       return fetch('https://medusa.payppy.app/store/collections',{
            headers:{
                'x-publishable-api-key': publishKey,
                'Content-Type': 'application/json'
            },
            credentials:'include'
        })
        .then((data)=>{
            return data.json();
        })
        .then((response)=>{
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return error;
        })
}

export default StoreCollectionsApi;