import { createElem } from "./createElem.js";

const loadImg = (url, description) => {
    return new Promise((resolve, reject) => { // создаём новое обещание. Создали две функции "resolve" и "reject", они автоматический передаются внутрь функции "Promise". "resolve" вызывается когда успешно завершается "Promise", "reject" вызывается если "Promise" завершился неудачно. 
        const img = new Image(); // создаём новую картинку с определёнными стилями.  
        img.width = "200";
        img.src = url; 
        img.alt = description;   
        img.addEventListener('load', () => { // сначала описываем какое событие должно произойти ("load"). 
            resolve(img) // вызываем функцию "resolve" и передаём в неё "img". Теперь "img" вернётся в "photo". 
        });
        img.addEventListener('error', (err) => {
            reject(new Error(err))
        });
    });
}

export const createCardPhoto = async (data) => { // функция которая будет получать данные по фотографии. 
    const card = createElem('li', { // создаём карточку с тегом "li". 
        className: 'card' // даём ей класс "card". 
    }); 

    // создаём структуру из HTML документа. 
    const cardItem = createElem('a',{
        id: data.id, // достаём из даты id. 
        className: 'grid-item', 
        href: `page.html?photo=${data.id}` // обращаемся к дате и достаём от туда id. 
    }); 
    
    const photo = await loadImg(data.urls.small, data.description); 
    
    // автор. 
    const author = createElem('a', {
        className: 'card__author',
        href: data.user.links.html
    }); 

    // создаём аватарку. 
    const avatarAuthor = new Image(); 
    avatarAuthor.className = 'author__photo';
    avatarAuthor.src = data.user.profile_image.medium;
    avatarAuthor.width = '32'; 
    avatarAuthor.height = '32'; 
    avatarAuthor.alt = data.user.bio;
    avatarAuthor.title = data.user.username; 

    author.append(avatarAuthor); // вставляем аватарку в автора. 

    // создаём кнопку лайка. 
    const likeBtn = createElem('button', {
        className: 'card__photo-like',
        textContent: data.likes
    });

    // создаём кнопку скачивания картинки. 
    const downloadLink = createElem('a', {
        className: 'card__download', 
        href: data.links.download, 
        download: true, 
        target: '_blank'
    }); 

    cardItem.append(photo, author, likeBtn, downloadLink); // собираем карточку, порядок обязательно нужно сохранять. 
    card.append(cardItem);


    return card 


};