import styles from "./invoice.module.css";
import {Typography} from "@mui/material";

export default function Invoice() {
    return (
        <div className={styles.parent}>
            <div className={styles.invoiceTemplateContainer}>
                <div className={styles.paper}>
                    <Typography variant="h2" fontWeight='bold'>
                        Invoice
                    </Typography>
                    <Typography variant="h3" fontWeight='bold'>
                        Invoice
                    </Typography>
                </div>
            </div>
            <div className={styles.details}>

            </div>
        </div>
    )
}

