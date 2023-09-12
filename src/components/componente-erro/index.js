import styles from "@/styles/erro.module.css";
import logo from "../../../public/images/logo.png";
import Image from "next/image";

export default function ComponenteErro() {
    return (
        <div className={styles.ErroContainer}>
            <Image
                src={logo}
                alt="Logo da rede de televisão RPC"
                className={styles.ImagemLogo}
            />
            <p className={styles.Aviso}>
                Erro nos dados da programação. Por favor, atualize a página.
            </p>
        </div>
    );
}
