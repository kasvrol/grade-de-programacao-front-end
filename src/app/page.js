"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ListaProgramacao from "@/components/lista-programacao";
import DataSelecionada from "@/components/data-selecionada";
import { formataData } from "@/utils/funcoes";

export default function Home() {
    const dataDeHoje = new Date();
    const [dataDeProgramacao, setDataDeProgramacao] = useState(
        formataData(dataDeHoje)
    );

    return (
        <main className={styles.Main}>
            <DataSelecionada
                dataDeHoje={dataDeHoje}
                setDataDeProgramacao={setDataDeProgramacao}
            />
            <ListaProgramacao dataDeProgramacao={dataDeProgramacao} />
        </main>
    );
}
