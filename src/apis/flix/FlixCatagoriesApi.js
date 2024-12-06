import axios from "axios";


async function FlixCatagoriesApi()
{
    try {
        let response=await axios.get('https://strapi.payppy.app/api/flix-catagories/?populate=*');

        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default FlixCatagoriesApi;