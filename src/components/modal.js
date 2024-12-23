function openModal(popup) {
    popup.classList.add('popup_is-animated_visible');
    document.addEventListener('keydown', closePopupByEscape);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-animated_visible');
    document.removeEventListener('keydown', closePopupByEscape);
}

function closePopupByOverlayClick(event) {
    const isCloseButton = event.target.classList.contains('popup__close');
    const isPopupOverlay = event.target.classList.contains('popup');

    if (isCloseButton || isPopupOverlay) {
        const popup = event.target.closest('.popup');
        closeModal(popup);
    }
}

function closePopupByEscape(event) {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup.popup_is-animated_visible');
        if (activePopup) {
            closeModal(activePopup);
        }
    }
}

export { closeModal, openModal, closePopupByOverlayClick, closePopupByEscape };