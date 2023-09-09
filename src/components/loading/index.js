import { Spin } from "antd";
import styles from "../../styles/loading.module.css";
import logo from "../../../public/images/logo.png";
import Image from "next/image";

export default function Loading() {
    return (
        <section className={styles.LoadingContainer}>
            <Image
                src={logo}
                alt="Logo da rede de televisão RPC"
                className={styles.ImagemLogo}
            />
            <Spin size="large" className={styles.Loading} />
        </section>
    );
}
