
let baseurl='https://payppy.in/';
function UserRegisterApi(payload)
{
    return fetch(`${baseurl}auth/register`,
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

export default UserRegisterApi;