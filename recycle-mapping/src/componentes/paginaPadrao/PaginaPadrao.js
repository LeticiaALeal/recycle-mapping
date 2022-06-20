import styles from './PaginaPadrao.scss';
import React from 'react';

export default function PaginaPadrao(){
    return (
        <>
        <header className={styles.header}>
        <div className={styles.header__text}>
          Recycle Mapping
        </div>
        </header>
        </>
    )
}