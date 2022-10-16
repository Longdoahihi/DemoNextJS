import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
function SelectBox(props) {
    return (
        <Grid container columns={1} width={props.width}>
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={1}

                >
                    <MenuItem value={1}>Phổ Biến</MenuItem>
                    <MenuItem value={2}>Bán Chạy</MenuItem>
                    <MenuItem value={3}>Hàng Mới</MenuItem>
                    <MenuItem value={4}>Giá Từ Thấp Đến Cao</MenuItem>
                    <MenuItem value={5}>Giá Cao Đến Thấp</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    );
}

export default SelectBox;