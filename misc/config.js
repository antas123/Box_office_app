const API_BASE_RULE = "https://api.tvmaze.com";

export async function apiGet(queryString){

    const response = await fetch(`${API_BASE_RULE}${queryString}`).then(r=>r.json())

    return response;
}