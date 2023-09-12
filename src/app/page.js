"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ListaProgramacao from "@/components/lista-programacao";
import DataSelecionada from "@/components/data-selecionada";
import { formataData, Data, transformaEmData } from "@/utils/funcoes";

export default function Home() {
    const dataDeHoje = Data;
    const [dataDeProgramacao, setDataDeProgramacao] = useState(
        formataData(Data)
    );
    const [dataAnteriorAoDiaAtual, setDataAnteriorAoDiaAtual] = useState(
        formataData(transformaEmData(dataDeProgramacao))
    );

    useEffect(() => {
        const diaAnteriorAData = transformaEmData(dataDeProgramacao);
        diaAnteriorAData.setDate(
            transformaEmData(dataDeProgramacao).getDate() - 1
        );
        setDataAnteriorAoDiaAtual(formataData(diaAnteriorAData));
    }, [dataDeProgramacao]);

    return (
        <main className={styles.Main}>
            <DataSelecionada
                dataDeHoje={dataDeHoje}
                setDataDeProgramacao={setDataDeProgramacao}
            />
            <ListaProgramacao
                dataDaProgramacao={dataDeProgramacao}
                dataDaProgramacaoAnteriorAoDiaAtual={dataAnteriorAoDiaAtual}
            />
        </main>
    );
}
