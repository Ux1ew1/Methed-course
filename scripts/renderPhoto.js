import { createElem } from "./createElem.js"

export const renderPhoto = (photoWrapper, photo) => {
    const img = createElem('img', {
        className: 'photo__picture',
        src: photo.urls.full, // console.log(photo) > object > urls > full 
        alt: photo.description || photo.alt_description,
        style: 'max-height: 80vh;',
    });

    const author = createElem('a', {
        className: 'photo__author',
        href: photo.user.links.html,
    });

    const avatarAuthor = createElem('img', {
        src: photo.user.profile_image.medium,
        alt: photo.user.bio,
        title: photo.user.username,
    });

    const userName = createElem('span', {
        textContent: photo.user.username,
    });

    const photoControl = createElem('div', {
        className: 'photo__controll',
    });

    const photoLike = createElem('button', {
        id: photo.id,
        className: "photo__like",
        textContent: photo.likes,
    });

    const photoDownload = createElem('a', {
        className: "photo__download",
        download: "true",
        href: photo.links.download,
        target: "_blank",
    });

    author.append(avatarAuthor, userName);
    photoControl.append(photoLike, photoDownload);
    photoWrapper.append(img, author, photoControl);
};
