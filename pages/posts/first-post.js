import Head from 'next/head';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Page from '../../components/Page';
import SideBarItem from '../../components/SideBarItem';
import SelectBox from '../../components/SelectBox';
import Product from '../../components/Product';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from "react";
function Post() {
    const [products,setProducts] = useState([]);
    const [data,setData] = useState([]);
    useEffect(()=>{
        // Gọi api get dữ liệu sản phẩm và get tất cả các ảnh về
        const urlPr = "http://localhost:1337/api/products";
        let listImage = [];
        let listProduct = [];
        axios.get(urlPr).then(response =>{
            setProducts(response.data.data);
        })
    },[]);
    
    return (
        <Page>
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
                                    <SelectBox width="200px" />
                                </Grid>
                            </Grid>
                        </Box>
                        {/* Hiển thị sản phẩm  */}
                        <Box>
                            <Grid container gap={1.2} >
                                {
                                    products.map((pr,index) =>{
                                        // console.log(pr.attributes.images[0].base_url);
                                        return( 
                                        <Grid key={index} item xs={2.3}>
                                            <Product pr={pr}/>
                                        </Grid>)
                                    })
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