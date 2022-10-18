import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup, Divider, Grid, Rating, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
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
    const [optionSelect, setOptionSelect] = useState(0);
    const [img, setImg] = useState("/images/snap.png");
    const [quatity, setQuantity] = useState(0);
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

    // Danh sách lựa chọn
    function showColorAndSizeOfProduct() {
        if (product) {
            const config_op = product.attributes.configurable_options[0];
            const title = config_op.name;

            // Xử lí khi click nút vào lựa chọn
            function handeClickOption(index) {
                setOptionSelect(index);
            }
            // Tạo danh sách các nút chứa các lựa chọn
            function getPropOption() {
                return config_op.values.map((prop, index) => {
                    return (
                        <Button key={index} onClick={() => { handeClickOption(index) }} className={styles.btn_option}>
                            {prop.label}
                            <div className={styles.btn_select + " " + ((index == optionSelect) ? "active_option" : "")}>
                                <div className={styles.btn_back_icon}></div>
                                <FontAwesomeIcon className={`fa-solid fa-check ${styles.btn_option_icon}`} icon={faCheck} />
                            </div>
                        </Button>
                    )
                })
            }
            // Tạo danh sách bao gồm tiêu đề.
            const option = () => {
                return (
                    <Box>
                        <Typography>{title} - <b>{config_op.values[optionSelect].label}</b></Typography>
                        <Box display="flex" flexWrap="wrap" width={700}>
                            {getPropOption()}
                        </Box>
                    </Box>
                )
            }

            return option();
        }
    }

    function handQuantityClick(operator) {
        let temp = parseInt(quatity);
        if (operator == "+") {
            temp = quatity + 1;
        } else {
            temp = quatity - 1;
        }

        if (temp >= 0) {
            setQuantity(temp);
        }
    }

    function getSpecificationInfo() {
        if (product) {
            const arrSpecs = product.attributes.specifications[0].attributes;
            return arrSpecs.map((row, i) => {
                return (
                    <TableRow className={styles.row_spec} key={i}>
                        <TableCell className={styles.col_tilte}><Typography fontWeight="bold">{row.name}</Typography></TableCell>
                        <TableCell sx={i % 2 == 0 ? { backgroundColor: "#edf1f2" } : { backgroundColor: "white" }} >{row.value}</TableCell>
                    </TableRow>)
            })
        }
    }

    // Lần đầu tiên khi component được khởi tạo thì product nhận giá trị là undefined
    // gọi hàm set Product sẽ làm thay đổi state nên componennt sẽ re-rendering
    return (
        <Page>
            <Box className={styles.main}>
                <Box className={styles.inner}>
                    {/*Trên -  Trang ảnh sản phẩm và một số thuộc tính cơ bản  */}
                    <Grid container columns={10} className={styles.layout__above}>
                        {/* Trái - Menu lọc  */}
                        <Grid item xs={3.8} className={styles.layout__above__left} >
                            <Stack direction="column" spacing={1}>
                                <Grid container columns={1}>
                                    <Grid item>
                                        <Image width={444} height={444} src={img} alt="demo" />
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
                            <Typography>Số lượng</Typography>
                            <ButtonGroup size="large">
                                <Button className={styles.font_14px} onClick={() => { handQuantityClick("-") }}>-</Button>
                                <Button disabled><Typography className={styles.font_14px}>{quatity}</Typography></Button>
                                <Button className={styles.font_14px} onClick={() => { handQuantityClick("+") }}>+</Button>
                            </ButtonGroup>
                            {/* button chọn mua  */}
                            <br />
                            <Button className={styles.btn_buy}>Chọn mua</Button>
                        </Grid>
                    </Grid>
                    <Grid container columns={12} className={styles.layout__below}>
                        {/*Dưới - Trang chi tiết sản phẩm và mô tả sản phẩm  */}
                        <Box bgcolor="#dde9ec52" width="100%">
                            <Table width={500} className={styles.table_spec}>
                                <Typography sx={{ padding: "8px 16px", fontSize: "20px" }}>Thông tin chi tiết</Typography>
                                <TableBody>
                                    {/* <TableCell><Typography fontWeight="bold">1</Typography></TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>3</TableCell>
                                    <TableCell>4</TableCell>
                                    <TableCell>5</TableCell> */}
                                    {
                                        getSpecificationInfo()
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Grid>
                </Box>
                <Footer />
            </Box>
        </Page>
    );
}

export default Product;