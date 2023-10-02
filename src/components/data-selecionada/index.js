"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/data-selecionada.module.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { formataData } from "@/utils/funcoes";
export default function DataSelecionada({ dataDeHoje, setDataDeProgramacao }) {
    const [data, setData] = useState(dataDeHoje);
    const [indiceDiaDaSemana, setIndiceDiaDaSemana] = useState(data.getDay());
    const [dia, setDia] = useState(data.getDate());
    const [indiceDiaDoMes, setIndiceDiaDoMes] = useState(data.getMonth());
    const [colorIconBack, setColorIconBack] = useState("#0288d1");
    const [colorIconNext, setColorIconNext] = useState("#0288d1");
    const dataAtual = new Date(dataDeHoje);

    useEffect(() => {
        setIndiceDiaDaSemana(data.getDay());
        setDia(data.getDate());
        setIndiceDiaDoMes(data.getMonth());
        setDataDeProgramacao(formataData(data));
    }, [data]);

    const diaDaSemanaPTBR = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

    const mesPTBR = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
    ];

    const mudarDataAtual = {
        diaAnterior: function () {
            setData(new Date(dataAtual.setDate(data.getDate() - 1)));
        },
        diaPosterior: function () {
            setData(new Date(dataAtual.setDate(data.getDate() + 1)));
        },
    };

    return (
        <section className={styles.DataContainer}>
            <ArrowBackIos
                sx={{ color: colorIconBack }}
                onClick={() => mudarDataAtual.diaAnterior()}
            />
            <p className={styles.DataTitulo}>
                {diaDaSemanaPTBR[indiceDiaDaSemana].toUpperCase()}, {dia} de{" "}
                {mesPTBR[indiceDiaDoMes].toUpperCase()}
            </p>
            <ArrowForwardIos
                sx={{ color: colorIconNext }}
                onClick={() => mudarDataAtual.diaPosterior()}
            />
        </section>
    );
}
