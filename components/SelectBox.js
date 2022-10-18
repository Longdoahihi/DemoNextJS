import { FormControl, InputLabel, MenuItem, Grid } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from "@mui/system";
import React, { useState } from "react";
function SelectBox(props) {
    const [sort,setSort] = useState(1);
    const setSortValue = (event)=>{
        props.setValueOfSortValue(event.target.value);
    }
    return (
        <Grid container columns={1} width={props.width}>
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={1}
                    onChange={setSortValue}
                >
                    <MenuItem value={1}>Phổ Biến</MenuItem>
                    <MenuItem value={2}>Bán Chạy</MenuItem>
                    <MenuItem value={3}>Giá Từ Thấp Đến Cao</MenuItem>
                    <MenuItem value={4}>Giá Cao Đến Thấp</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    );
}

export default SelectBox;