import axios from "axios";


async function FlixForYouApi()
{
    try {
        let response=await axios.get('http://148.135.138.27:1337/api/flixes/?populate=*');

        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default FlixForYouApi;