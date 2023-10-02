import axios from "axios";

export async function API_PROGRAMACAO(data) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Request-Width, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json;charset=UTF-8",
    };
    try {
        const response = await axios.get(
            `https://epg-api.video.globo.com/programmes/d1337?date=${data}`,
            {
                headers,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error.message);

        try {
            const alternativeResponse = await axios.get(
                `http://localhost:3002/programas/${data}`,
                {
                    headers,
                }
            );
            return alternativeResponse.data;
        } catch (errorAlternativeResponse) {
            console.error(
                "Erro na requisição alternativa:",
                errorAlternativeResponse.message
            );
            throw new Error("Erro na requisição alternativa");
        }
    }
}
