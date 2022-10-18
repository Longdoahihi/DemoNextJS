import styles from '../styles/header.module.css';
import Image from 'next/image';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faCartShopping,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';


function Header(props) {
    const [keyword,setKeyword] = useState("");
    function handleButtonFindClick(){
        console.log("Giá trị: " + keyword)
        props.findByKeyword(keyword)
    }

    const handleInputKeywordChange = (e) =>{
        setKeyword(e.target.value);
    }
    return (
        <div className={styles.header}>
            <div className={styles.header__inner}>
                <div className={styles.header__logo}>
                <a href='http://bfd.vn'>
                <Image src='/images/logo-bfd.png' width={153} height={51} />
                </a>
                    
                </div>
                <div className={styles.header__search}>
                    <input onChange={handleInputKeywordChange} className={styles.header__search__input} type='text' name='content_search' placeholder='Bạn muốn tìm sản phẩm gì?...' />
                    <button onClick={handleButtonFindClick} className={styles.header__search__button} type='submit'>
                        <FontAwesomeIcon icon={faSearch} className={`fa-solid fa-magnifying-glass ${styles.search__icon}`} />
                        Tìm Kiếm
                    </button>
                </div>
                <div className={styles.header__card}>
                    <FontAwesomeIcon className={`fa-solid fa-cart-shopping ${styles.header__card__icon}`}  icon={faCartShopping} />
                </div>
            </div>
        </div>
    );
}

export default Header;