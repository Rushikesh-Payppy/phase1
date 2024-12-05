import axios from "axios";


async function FlixForYouBlogData(id)
{
    try {
        let response=await axios.get(`http://148.135.138.27:1337/api/flixes/${id}?populate=*`);

        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default FlixForYouBlogData;