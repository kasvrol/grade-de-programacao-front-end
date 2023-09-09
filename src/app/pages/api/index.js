import axios from "axios";

export async function API_PROGRAMACAO(data) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json;charset=UTF-8",
    };

    try {
        const response = await axios.get(
            `https://epg-api.video.globo.com/programmes/1337?date=${data}`,
            {
                headers,
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
