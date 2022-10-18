import Head from 'next/head';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Page from '../../components/Page';
import SideBarItem from '../../components/SideBarItem';
import SelectBox from '../../components/SelectBox.js';
import Product from '../../components/Product';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from "react";
import Header from '../../components/Header';
function Post() {
    const [products, setProducts] = useState([]);
    const [sortValue, setSortValue] = useState(1);
    const [keyword, setKeyword] = useState("");

    // Giá trị sortValue bị thay đổi
    function sortByValue(valuesSort,keyword) {
        if (products) {
            const getAPI_Pr = async () => {
                const urlPr = "http://localhost:1337/api/products";
                await axios.get(urlPr).then(response => {
                    // setProducts(response.data.data);
                    let listProduct_sort = response.data.data;
                    //****Tìm kiếm */
                    if (keyword.trim() !== ""){
                        listProduct_sort = listProduct_sort.filter((pr)=>{
                            return pr.attributes.name.toLowerCase().includes(keyword.toLowerCase());
                        })
                        console.log(listProduct_sort)
                    }
                    //****Sắp xếp */
                    // Phổ biến
                    if (valuesSort == 1) {
                        setProducts(listProduct_sort);
                    }
                    // Bán chạy
                    if (valuesSort == 2) {
                        listProduct_sort.sort((a, b) => b.attributes.all_time_quantity_sold - a.attributes.all_time_quantity_sold);
                        setProducts(listProduct_sort);
                    }
                    // Giá từ thấp  đến cao
                    if (valuesSort == 3) {
                        listProduct_sort.sort((a, b) => a.attributes.price - b.attributes.price);
                        setProducts(listProduct_sort);
                    }
                    // Giá từ cao đến thấp
                    if (valuesSort == 4) {
                        listProduct_sort.sort((a, b) => b.attributes.price - a.attributes.price);
                        setProducts(listProduct_sort);
                    }
                })
            }
            getAPI_Pr();
        }

    }
    useEffect(() => {
        // Gọi api get dữ liệu sản phẩm và get tất cả các ảnh về
        if (products.length == 0) {
            const urlPr = "http://localhost:1337/api/products";
            axios.get(urlPr).then(response => {
                setProducts(response.data.data);
            })
        }
    }, []);

    useEffect(() => {
        sortByValue(sortValue,keyword);
    }, [sortValue,keyword])

    // Người dùng chọn giá trị
    function setValueOfSortValue(val) {
        setSortValue(val);
    }
    // Nguười tìm kiếm
    function findByKeyword(str){
        setKeyword(str);
    }
    // Hiển thị danh sách tóm tắt các sản phẩm
    function showProduct() {
        return products.map((pr, index) => {
            // console.log(pr.attributes.images[0].base_url);
            return (
                <Grid key={index} item xs={2.3}>
                    <Product pr={pr} />
                </Grid>)
        })
    }
    return (
        <Page>
            <Header products={products} findByKeyword={(str)=>{findByKeyword(str)}}/>
            <Grid className='grid' wrap='nowrap' gap={0.5} container paddingLeft={20} paddingRight={15} columns={8} >
                {/* Cột hiển thị menu lọc sản phẩm theo thuộc tính sản phẩm */}
                <Grid item xs={1}>
                    <SideBarItem />
                    <SideBarItem />
                    <SideBarItem />
                    <SideBarItem />
                    <SideBarItem />
                </Grid>
                <Grid item xs={7} marginTop={0.5}>
                    {/* Cột hiển thị menu sắp xếp và hiển thị danh sách sản phẩm*/}
                    <Box bgcolor="white">
                        {/* Menu sắp xếp  */}
                        <Box borderRadius={2} borderBottom="5px solid #c7d3d752">
                            <Grid container columns={1} paddingTop={1.5} paddingBottom={1.5}>
                                <Grid item alignSelf="center" paddingLeft={2.5} paddingRight={2.5}
                                    fontSize={16} fontWeight="bold">
                                    Sắp xếp theo
                                </Grid>
                                <Grid item >
                                    <SelectBox width="200px" setValueOfSortValue={(val) => { setValueOfSortValue(val) }} />
                                </Grid>
                            </Grid>
                        </Box>
                        {/* Hiển thị sản phẩm  */}
                        <Box>
                            <Grid container gap={1.2} >
                                {
                                    showProduct()
                                }
                            </Grid>
                        </Box>
                        {/* Chuyển trang  */}
                        <Box px={1} py={1}>
                            <Pagination count={10} variant="outlined" shape="rounded" />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Page>
    );
}

export default Post;