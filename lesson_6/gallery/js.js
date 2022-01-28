'use strict';

const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
        imageNotFoundSrc: 'images/gallery/duck.gif',
    },
  init(userSettings = {}){
     Object.assign(this.settings, userSettings);

     document
         .querySelector(this.settings.previewSelector)
         .addEventListener('click', event => this.containerClickHandler(event));
  },
    containerClickHandler(event) {
        if (event.target.tagName !=="IMG"){
            return;
        }
        this.openImage(event.target.dataset.full_image_url);
    },
    openImage(src) {
        const container = this.getScreenContainer();
        const image = container.querySelector(`.${this.settings.openedImageClass}`)
        image.src = src;
    },
    getScreenContainer() {
        const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
        if (galleryWrapperElement){
            return galleryWrapperElement;
        }
        return this.createScreenContainer();
    },
    createScreenContainer() {
        // Создаем сам контейнер-обертку и ставим ему класс.
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        // Добавляем контейнер-обертку в тег body.
        document.body.appendChild(galleryWrapperElement);

        // Возвращаем добавленный в body элемент, наш контейнер-обертку.
        return galleryWrapperElement;
    },
    close(){
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },
};

