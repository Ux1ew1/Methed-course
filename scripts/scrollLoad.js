import { createCardPhoto } from "./createCardPhoto.js"; 
import { getData } from "./getData.js"; 

export const scrollLoad = (gallery, grid, endElement) => { // создаём фунцию и передаём в ней параметры за которыми нам надо следить.
    const observer = new IntersectionObserver( // создаём обсервер - это подписка, мы подписываемся на определённый элемент. Создаём "IntersectionObserver" - это объект который будет подписываться на определённые действия, и он будет принимать функцию, которая будет принимать в себя "entries". 
        async (entries) => { // "entries" - элементы которые будут там содержаться, на которые мы подписываемся. Добавили перед "entries" async, чтобы "await" работал. 
            if (entries[0].isIntersecting) { // если мы видим нулевой "entries" 
                const photos = await getData(); 
                const cards = photos.map(createCardPhoto);

                Promise.all(cards).then(cards => { 
                    gallery.append(...cards); 
                    grid.appended(cards);
                });
            }
        }, {
            rootMargin: '250px', // делаем так, чтобы обсервер срабатывал на 150px раньше. 
        }, 
    );
    observer.observe(endElement) // обращаемся к нашему обсерверу, у него есть метод "observe" и передаём туда наш "endElement", теперь мы следим за ним. 
}