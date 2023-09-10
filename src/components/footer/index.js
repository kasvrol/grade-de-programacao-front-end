import styles from "../../styles/footer.module.css";
import logo from "../../../public/images/logo_globo.svg";
import Image from "next/image";

export default function Footer() {
    return (
        <header className={styles.Footer}>
            <div className={styles.LogoContainer}>
                <Image
                    src={logo}
                    alt="Logo da rede de televisão RPC"
                    className={styles.ImagemLogo}
                />
            </div>
            <p className={styles.Copyright}>
                © Copyright 2000-2023 Globo Comunicação e Participações S.A.
            </p>
        </header>
    );
}
