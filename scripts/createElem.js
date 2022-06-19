export const createElem = (tags, attrs) => { // создаём элементы с помощью этой функции. 
    const elem = document.createElement(tags);
    Object.assign(elem, attrs); 
    return elem;
};
