"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/data-selecionada.module.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
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
        setDataDeProgramacao(
            data.toLocaleDateString("pt-BR").split("/").reverse().join("-")
        );
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
        "novembro",
        "dezembro",
    ];

    const verificaData = (dataParametro) => {
        const dataModificada = new Date(
            dataParametro
                .toLocaleDateString("pt-BR")
                .split("/")
                .reverse()
                .join("-")
        );
        const diferencaEmMilissegundos = dataDeHoje - dataModificada;
        const diferencaEmDias = Math.floor(
            diferencaEmMilissegundos / (1000 * 60 * 60 * 24)
        );
        return diferencaEmDias;
    };

    const mudarDataAtual = {
        diaAnterior: function () {
            const diasAlterados = verificaData(
                new Date(dataAtual.setDate(data.getDate() - 1))
            );

            if (diasAlterados === +1 || diasAlterados === 0) {
                setData(new Date(dataAtual.setDate(data.getDate() - 1)));
            }
        },
        diaPosterior: function () {
            const diasAlterados = verificaData(
                new Date(dataAtual.setDate(data.getDate() + 1))
            );

            if (diasAlterados === -1 || diasAlterados === 0) {
                setData(new Date(dataAtual.setDate(data.getDate() + 1)));
            }
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
