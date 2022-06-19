import { getData } from './getData.js';
import { renderGallery } from './renderGallery.js';
import { renderPhoto } from "./renderPhoto.js";

const init = async ({selectorGalleryWrapper, selectorPhotoWrapper}) => { // сделали функцию асинхронной, чтобы мы могли использовать "await". "await" - дождётся когда "primise" который вернётся к функции "getData" выполниться, и вернёт нам "promise result", т.е. "photos" запишется в "promise result". Получаем "selectorWrapper". 
    const galleryWrapper = document.querySelector(selectorGalleryWrapper); // сюда будем вставлять нашу сетку с фотографиями. 
    const photoWrapper = document.querySelector(selectorPhotoWrapper); // "wrapper" для фотографий.

    if (galleryWrapper) { // если получили "galleryWrapper". 
        const photos = await getData({ count: 30 });  // получаем новые карточки. 
        renderGallery(galleryWrapper, photos); // передаём сюда родителя куда нужно вставить галерею ("wrapper") и от куда надо вставить фотографии в эту галерею ("photo"). 
    }

    if (photoWrapper) { // если вдруг получили "photoWrapper". 
        const url = new URL(location.href); // получаем URL нашей страницы. 
        console.log('url', url);
        const idPhoto = (url.searchParams.get('photo')); 

        if (idPhoto) {
            const photo = await getData({ idPhoto }); // получаем фотографию. 
            renderPhoto(photoWrapper, photo); // рендерим эту фотографию. 
        }
    }
};

init({ // принимаем объекты. 
    selectorGalleryWrapper: '.gallery__wrapper',  
    selectorPhotoWrapper: '.photo__wrapper', 
});