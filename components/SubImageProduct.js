import Image from "next/image";
import { useState } from "react";
import styles from "../styles/subimageproduct.module.css";
function SubImageProduct(props) {
    // const [isActive,setActive] = useState(false);
    function handleClickSubImage(){
        props.handleSubImageClick(props.src);
    }
    return (
        <Image width={66} height={66} onClick={handleClickSubImage} className={props.showBorder ? styles.image__sub__active : styles.image__sub} src={props.src}/>
    );
}

export default SubImageProduct;