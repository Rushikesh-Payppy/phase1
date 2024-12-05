
let baseurl='https://payppy.in/';
function GetCartInfoApi(accessToken)
{
    return fetch(`${baseurl}auth/profile
`,
        {
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": "pk_bf713f1adcc6ed35b4881cb9eb1cfb448f057b0fee771da4eeadf6eb0aafb740",
                'Authorization': 'Bearer '+accessToken
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

export default GetCartInfoApi;