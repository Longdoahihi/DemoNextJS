import { Box, Container } from "@mui/system";
import { Typography, Rating, Stack, Divider, Button, Badge, ListItem, Card } from "@mui/material";
import Image from "next/image";
import styles from "../styles/product.module.css";
import { useRouter } from "next/router";


function Product(props) {
    const router = useRouter();
    function cardOnClick() {
        const path = '/products/' + props.pr.id;
        router.push(path);
    }
    return (
        <Card className={styles.product} onClick={cardOnClick} >
            <Image src={props.pr.attributes.images[0].base_url} width={350} height={400} className={styles.product__image} />
            <Stack direction="column" divider={<Divider spacing={0.5} />} bgcolor="white">
                <Container className={styles.products__content}>
                    <Typography variant="body1" className={styles.product__heading} >{props.pr.attributes.name}</Typography>
                    <Stack
                        alignItems="center"
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={0.5}
                    >
                        <Rating name="read-only" value={2} readOnly />
                        <Typography>{props.pr.attributes.all_time_quantity_sold? ("Đã bán "+props.pr.attributes.all_time_quantity_sold) : ""}</Typography>
                    </Stack>
                    <Typography className={styles.products__price}>
                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(props.pr.attributes.price)}
                    </Typography>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={0.5}>
                        <Button disabled size="small" variant="outlined">Rẻ hơn hoàn tiền</Button>
                        <Button disabled size="small" variant="outlined">Freeship+</Button>
                    </Stack>
                </Container>
                <Box bgcolor="white">
                    <Stack spacing={0.5} direction="row" className={styles.products__badge}>
                        <Image src="/images/badge.png" width={36} height={12} />
                        <Typography>Giao hàng siêu tốc</Typography>
                    </Stack>
                </Box>
            </Stack>
        </Card>
    );
}

export default Product;