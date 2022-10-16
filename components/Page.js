import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import styles from '../styles/page.module.css';
/**
 * Cấu trúc chung của một trang nào đó.
 * @param children : nội dunng body của  trang triển khai cụ thể
 * @returns 
 */
function Page({children}) {
    return ( 
        <>
            <Head>
                <title>Sản phẩm</title>
                <link rel="icon" href="/images/logo-bfd.ico" type="image/icon type"></link>
            </Head>
            <div className={styles.container}>
                <Header/>
                {children}
            </div>
        </>
     );
}

export default Page;