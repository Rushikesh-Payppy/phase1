import axios from "axios";


async function PoliciesApi(title)
{
    try {
        let response=await axios.get(`http://148.135.138.27:1337/api/policies?populate=*`);

        let data=response.data;

        let titleMatchedPolicy=response.data?.data.find((element,index)=>{
            return element.policy_title==title;
        })
        
        return titleMatchedPolicy;

    } catch (error) {
        console.log(error);
        
    }
}

export default PoliciesApi;