// В этом скрипте будем получать данные из data.json 

import { API_URL_PHOTOS, ACCESS_KEY } from "./const.js";

export const getData = ({page = 1, count, idPhoto}) => { 
    const url = new URL(API_URL_PHOTOS); // получаем URL фотографии. 

    url.searchParams.set('client_id', ACCESS_KEY); // передаём аксес токен. Аксес токен - это "client_id". 

    if (page && count) {

        url.searchParams.append('per_page', count); // сколько фотографий. 
        url.searchParams.append('page', page); // страницы. 
    };

    if (idPhoto) {
        url.pathname += `/${idPhoto}`;
    };

    return fetch(url).then((data) => { return data.json() }); // пока у нас нет сервера, возвращаем дату локально. ".then" - получаем "response" из "data.json" (вместо "response" можно указать любое другое название). 
}; 