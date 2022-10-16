import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, Divider, Grid, Rating, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Page from "../../components/Page";
import SubImageProduct from "../../components/SubImageProduct";
import styles from "../../styles/product_detail.module.css";

function Product(props) {
    const [product, setProduct] = useState();
    const [img, setImg] = useState("");
    let pId;
    const router = useRouter();
    useEffect(() => {
        if (product == null) {
            if (router.isReady) {
                pId = router.query.id; // Lấy id của sản phẩm được chọn ở page danh sách
                axios.get("http://localhost:1337/api/products").then(resolve => {
                    const listPr = resolve.data.data;
                    const pr = listPr.find(prElement => prElement.id == pId);
                    setProduct(pr);
                    setImg(pr.attributes.images[0].base_url);
                })
            }

        }
    }, [router.isReady, product]);
    // Tắt tất cả hình ảnh
    function showListImage() {
        if (product) {
            return product.attributes.images.map(((item, index) => {
                return (
                    <SubImageProduct showBorder={item.base_url == img} key={index} handleSubImageClick={handleSubImageClick} src={item.base_url} />
                )
            }))
        }
    }
    function getAtrributesProduct(attr, properties) {
        if (product) {
            if (properties != null) {
                const attributes = product.attributes["" + attr];
                return attributes["" + properties];
            } else {
                return product.attributes["" + attr];
            }
        }
        return null;
    }
    // Hiển thị hình ảnh được bấm vào
    function handleSubImageClick(src) {
        setImg(src);
    }

    // Hiển thị các thuộc tính màu sắc và kích thước để chọn
    function showColorAndSizeOfProduct() {
        return (
            <Box>
                <Typography>CHỌN MÀU</Typography>
                <Box display="flex" flexWrap="wrap" width={500}>
                    <Button className={styles.btn_option}>
                        Size 7XL(99-100 kg)
                        <div className={styles.btn_select}>
                            <div className={styles.btn_back_icon}></div>
                            <FontAwesomeIcon className={`fa-solid fa-check ${styles.btn_option_icon}`} icon={faCheck} />
                        </div>
                    </Button>
                    <Button className={styles.btn_option}>
                        Size 7XL(99-100 kg)
                        <div className={styles.btn_select}>
                            <div className={styles.btn_back_icon}></div>
                            <FontAwesomeIcon className={`fa-solid fa-check ${styles.btn_option_icon}`} icon={faCheck} />
                        </div>
                    </Button>
                    <Button className={styles.btn_option}>
                        Size 7XL(99-100 kg)
                        <div className={styles.btn_select}>
                            <div className={styles.btn_back_icon}></div>
                            <FontAwesomeIcon className={`fa-solid fa-check ${styles.btn_option_icon}`} icon={faCheck} />
                        </div>
                    </Button>
                    <Button className={styles.btn_option}>
                        Size 7XL(99-100 kg)
                        <div className={styles.btn_select}>
                            <div className={styles.btn_back_icon}></div>
                            <FontAwesomeIcon className={`fa-solid fa-check ${styles.btn_option_icon}`} icon={faCheck} />
                        </div>
                    </Button>
                    <Button className={styles.btn_option}>
                        Size 7XL(99-100 kg)
                        <div className={styles.btn_select}>
                            <div className={styles.btn_back_icon}></div>
                            <FontAwesomeIcon className={`fa-solid fa-check ${styles.btn_option_icon}`} icon={faCheck} />
                        </div>
                    </Button>
                </Box>
            </Box>
        )
    }


    // Lần đầu tiên khi component được khởi tạo thì product nhận giá trị là undefined
    // gọi hàm set Product sẽ làm thay đổi state nên componennt sẽ re-rendering
    return (
        <Page>
            <Box className={styles.main}>
                <Grid container columns={10} className={styles.layout__above}>
                    {/*Trên -  Trang ảnh sản phẩm và một số thuộc tính cơ bản  */}
                    <Grid item xs={3.8} className={styles.layout__above__left} >
                        <Stack direction="column" spacing={1}>
                            <Grid container columns={1}>
                                <Grid item>
                                    <Image width={444} height={444} src={img} />
                                </Grid>
                            </Grid>
                            {/* Danh sách các ảnh kèm theo  */}
                            <Grid container column={12} flexDirection="row" gap={1}>
                                {
                                    showListImage()
                                }

                            </Grid>
                        </Stack>
                    </Grid>
                    {/* Phải - Hiển thị một số thông tin sản phẩm */}
                    <Grid item xs={6} className={styles.layout__above__right}>
                        {/* Thương hiệu - Trademark  */}
                        <Typography className={styles.brand}>Thương hiệu : <b>{getAtrributesProduct("brand", "name")}</b></Typography>
                        {/* Tiêu đề - tỉtle */}
                        <Typography className={styles.name}>{getAtrributesProduct("name", null)}</Typography>
                        {/* Đánh giá -  rating */}
                        <Stack
                            alignItems="center"
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={0.5}
                        >
                            <Rating name="read-only" value={getAtrributesProduct("rating_average", null) == null ? 0 : getAtrributesProduct("rating_average", null)} readOnly />
                            <Typography>Đã bán {getAtrributesProduct("all_time_quantity_sold", null)}</Typography>
                        </Stack>

                        {/* Giá tiền - price */}
                        <Typography className={styles.price}>
                            {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                .format(getAtrributesProduct("price", null))}
                        </Typography>
                        {/* Màu sắc - color */}
                        {/* Kích thước - size */}
                        {
                            showColorAndSizeOfProduct()
                        }
                        {/* button nhập số lượng  */}
                        {/* button chọn mua  */}
                    </Grid>
                </Grid>

                <Grid container columns={12} className={styles.layout__below}>
                    {/*Dưới - Trang chi tiết sản phẩm và mô tả sản phẩm  */}
                    dưới
                </Grid>
            </Box>
            {/* Footer  */}
            <Footer />
        </Page>
    );
}

export default Product;