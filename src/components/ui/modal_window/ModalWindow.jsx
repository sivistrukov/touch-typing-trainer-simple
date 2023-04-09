import cl from './ModalWindow.module.css'
import React from 'react';

function ModalWindow({children, visible}) {
    const rootClasses = [cl.modalWindow];
    if (visible) rootClasses.push(cl.active);

    return (
        <div className={rootClasses.join(' ')}>
            <div className={cl.modalWindowContent}>
                {children}
            </div>
        </div>
    );
}

export default ModalWindow;