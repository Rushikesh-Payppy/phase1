let baseurl='https://payppy.in/';
function SentOtpApi(payloadObj)
{
    return fetch(`${baseurl}api/send-otp`,
        {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(payloadObj),
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    })
}

export default SentOtpApi;