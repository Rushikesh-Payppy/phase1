
let baseurl='https://payppy.in/';
function ForgotPasswordApi(payload)
{
    return fetch(`${baseurl}auth/forgot-password`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(payload)
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    })
}

export default ForgotPasswordApi;