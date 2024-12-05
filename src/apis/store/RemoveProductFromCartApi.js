
let baseurl='https://medusa.payppy.app/';
function RemoveProductFromCartApi(cartId,lineId)
{
    return fetch(`${baseurl}store/carts/${cartId}/line-items/${lineId}
`,
        {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": "pk_bf713f1adcc6ed35b4881cb9eb1cfb448f057b0fee771da4eeadf6eb0aafb740",
            },
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    })
}

export default RemoveProductFromCartApi;