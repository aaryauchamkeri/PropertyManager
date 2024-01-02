import LabelInput from "./LabelInput";
import styles from "./house.module.css";


export default function HouseInfo() {
    return (
        <div className={styles.main}>
            <div className={styles.genInfo}>
                <LabelInput name={'Address'} placeholder = {'Enter Address'} id={'address'} gCol={'1/2'} gRow={'1/2'}/>
                <LabelInput name={'Company'} id={'company'} gCol={'2/3'} gRow={'1/2'}/>
                <LabelInput name={'Price'} id={'price'} gCol={'3/4'} gRow={'1/2'}/>
            </div>
        </div>
    )
}