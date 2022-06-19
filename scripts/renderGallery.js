import { createCardPhoto } from "./createCardPhoto.js";
import { createElem } from "./createElem.js"; 
import { scrollLoad } from "./scrollLoad.js";
 


export const renderGallery = (wrapper, photos) => { // принимаем "wrapper" и "photo". 
    const gallery = createElem('ul', {
        className: 'grid'
    });

    const endElem = createElem('div'); // создаём последний элемент для бесконечного скрола. 

    wrapper.append(gallery);

    const grid = new Masonry(gallery, { // инициализировали скрипт. Передаём сюда "gallery" и опции. 
        gutter: 10, // расстояние между элементами. 
        itemSelector: '.card', // указали наши элементы. 
        columnWidth: 200, // ширина колонок. 
        isFitWidth: true, // делаем всё по центру. 
    }) // все эти настройки есть в документации на сайте. 

    const cards = photos.map(createCardPhoto);  // будем переберать все фотки с помощью метода "map". "photo" берётся из массива "photos", "map" переберает этот массив. 
    Promise.all(cards) // чтобы обработать сразу пачку запросов, используем "Promise" с функцией "all", передаём наш массив "(cards)". 
        .then(cards => { // дожидаемся когда наши промисы обработаются и дальше производим с ними действия.
            gallery.append(...cards) // "append" - добавляем элемент в конец. "..." - нужны чтобы размазать элементы по странице, без них добавиться массив. 
            grid.appended(cards) // грид сетка. 
            wrapper.append(endElem); // передаём последний элемент в "wrapper" 
            scrollLoad(gallery, grid, endElem); // передаём функцию и параметры из неё. 
        })
};