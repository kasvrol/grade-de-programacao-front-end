"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import DataSelecionada from "@/components/data-selecionada";

export default function Home() {
    const dataDeHoje = new Date();
    const [dataDeProgramacao, setDataDeProgramacao] = useState(
        dataDeHoje.toLocaleDateString("pt-BR").split("/").reverse().join("-")
    );

    return (
        <main className={styles.Main}>
            <DataSelecionada
                dataDeHoje={dataDeHoje}
                setDataDeProgramacao={setDataDeProgramacao}
            />
        </main>
    );
}
