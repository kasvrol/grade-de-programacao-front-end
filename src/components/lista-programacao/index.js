"use client";
import { useEffect, useState } from "react";
import { API_PROGRAMACAO } from "../../app/pages/api/index";
import Loading from "../loading";
import styles from "../../styles/lista-de-programacao.module.css";
import { Collapse } from "antd";
import Image from "next/image";

export default function ListaProgramacao({ dataDeProgramacao }) {
    const [dados, setDados] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        API_PROGRAMACAO(dataDeProgramacao)
            .then((apiData) => {
                setDados(apiData);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [dataDeProgramacao]);

    const converterTimestamp = {
        horario: function (timestamp) {
            const timestampBase = new Date(timestamp * 1000);

            const formatacaoMinutos =
                timestampBase.getMinutes() < 10
                    ? "00"
                    : `${timestampBase.getMinutes()}`;
            return {
                hora: timestampBase.getHours(),
                minutos: formatacaoMinutos,
            };
        },
        data: function (timestamp) {
            const timestampBase = new Date(timestamp * 1000);

            const timestampLocal = timestampBase
                .toLocaleDateString("pt-BR")
                .split("/")
                .reverse()
                .join("-");

            if (timestampLocal === dataDeProgramacao) {
                return timestampLocal;
            }
        },
    };

    const ProgramacaoAFiltar = () => {
        const filtrarProgramacao = dados.programme.entries.filter(
            (programa) => {
                const programacaoDoDia = converterTimestamp.data(
                    programa.start_time
                );
                if (programacaoDoDia) {
                    return programa;
                }
            }
        );

        return filtrarProgramacao;
    };

    const verificaImagem = (imagem, alt, tipo) => {
        if (imagem) {
            return (
                <div className={styles[`ImagemContainer${tipo}`]}>
                    <img
                        src={imagem}
                        alt={`Imagem referente a programação ${alt}`}
                        className={styles.Imagem}
                    />
                </div>
            );
        }
    };

    const InformacoesAdicionaisDoPrograma = (descricao) => {
        const titulo = descricao.Sinopse
            ? descricao.Resumo.Sinopse
            : descricao.title
            ? descricao.title
            : descricao.program.name;

        const descricaoDaProgramacao = descricao.description
            ? descricao.description
            : descricao.Resumo.Sinopse;

        const ImagemDaProgramacao = descricao.custom_info.Graficos.ImagemURL
            ? descricao.custom_info.Graficos.ImagemURL
            : "";

        return (
            <section className={styles.CardContainer}>
                <h3 className={styles.TituloDaApresentacao}>{titulo}</h3>
                <div className={styles.Apresentacao}>
                    {verificaImagem(
                        ImagemDaProgramacao,
                        titulo,
                        "Apresentacao"
                    )}
                    <p className={styles.ApresentacaoTextual}>
                        {descricaoDaProgramacao}
                    </p>
                </div>
            </section>
        );
    };

    const InformacoesDoPrograma = (programa) => {
        const programacaoHora = converterTimestamp.horario(programa.start_time);
        console.log(programacaoHora);
        const titulo = programa.program.name;

        return (
            <section className={styles.ListaContainer}>
                {verificaImagem(
                    programa.custom_info.Graficos.LogoURL,
                    titulo,
                    "Logo"
                )}
                <p className={styles.Horario}>
                    {programacaoHora.hora}:{programacaoHora.minutos}
                </p>
                <h2 className={styles.Titulo}>{titulo}</h2>
            </section>
        );
    };

    const Programacao = () => {
        return ProgramacaoAFiltar().map((program, index) => {
            return {
                key: index,
                label: InformacoesDoPrograma(program),
                children: InformacoesAdicionaisDoPrograma(program),
            };
        });
    };

    return (
        <section className={styles.ListaDeProgramacaoContainer}>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={styles.Collapse}>
                    <Collapse accordion items={Programacao()} />{" "}
                </div>
            )}
        </section>
    );
}
