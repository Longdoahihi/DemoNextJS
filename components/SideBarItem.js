// Một mục sidebar nhỏ trong danh sách các sidebar
import { FormControlLabel, Checkbox } from "@mui/material";
import styles from '../styles/sidebaritem.module.css';

function SideBarItem() {
    return (
        <>
            <div className={styles.sidebar__line}></div>
            <div className={styles.sidebar}>
                <h1 className={styles.sidebar__title}>Nơi bán</h1>
                <FormControlLabel className={styles.sidebar__item} control={<Checkbox defaultChecked={false} />} label="Hà Nội" />
                <FormControlLabel className={styles.sidebar__item} control={<Checkbox defaultChecked={false} />} label="Hồ Chí Minh" />
                <FormControlLabel className={styles.sidebar__item} control={<Checkbox defaultChecked={false} />} label="Nam Định" />
                <FormControlLabel className={styles.sidebar__item} control={<Checkbox defaultChecked={false} />} label="Thái Nguyên" />
                <FormControlLabel className={styles.sidebar__item} control={<Checkbox defaultChecked={false} />} label="Vĩnh Phúc" />
            </div>
        </>
    );
}

export default SideBarItem;