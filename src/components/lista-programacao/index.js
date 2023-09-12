"use client";
import { useEffect, useState } from "react";
import { API_PROGRAMACAO } from "../../app/pages/api/index";
import Loading from "../loading";
import styles from "@/styles/lista-de-programacao.module.css";
import { Collapse } from "antd";
import { formataData, transformaHorarioEmString, Data } from "@/utils/funcoes";
import ComponenteErro from "../componente-erro";

export default function ListaProgramacao({
    dataDaProgramacao,
    dataDaProgramacaoAnteriorAoDiaAtual,
}) {
    const [dadosDoDiaAtual, setDadosDoDiaAtual] = useState("");
    const [dadosDoDiaAnterior, setDadosDoDiaAnterior] = useState("");
    const [carregandoDiaAtual, setCarregandoDiaAtual] = useState(true);
    const [carregandoDiaAnterior, setCarregandoDiaAnterior] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        API_PROGRAMACAO(dataDaProgramacao)
            .then((apiData) => {
                setDadosDoDiaAtual(apiData);
                setCarregandoDiaAtual(false);
            })
            .catch((error) => {
                setError(true);
                setCarregandoDiaAtual(false);
            });

        API_PROGRAMACAO(dataDaProgramacaoAnteriorAoDiaAtual)
            .then((apiData) => {
                setDadosDoDiaAnterior(apiData);
                setCarregandoDiaAnterior(false);
            })
            .catch((error) => {
                setError(error);
                setCarregandoDiaAnterior(false);
            });
    }, [dataDaProgramacao]);

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

            const timestampLocal = formataData(timestampBase);

            if (timestampLocal === dataDaProgramacao) {
                return timestampLocal;
            }
        },
    };

    const ProgramacaoAFiltar = (programacaoInteira) => {
        if (programacaoInteira) {
            const filtrarProgramacao = programacaoInteira.filter((programa) => {
                const programacaoDoDia = converterTimestamp.data(
                    programa.start_time
                );
                if (programacaoDoDia) {
                    return programa;
                }
            });

            return filtrarProgramacao;
        }
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

    const verificaSeEstaAoVivo = (horarioEData) => {
        const verificarDia = converterTimestamp.data(horarioEData.start_time);
        const hoje = formataData(Data);
        if (verificarDia === hoje) {
            const horarioAoVivo = Data.toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo",
            })
                .split(",")
                .at(-1)
                .replace(/^\s+/, "");
            const fimDaProgramacao = transformaHorarioEmString(
                horarioEData.end_time
            );
            const inicioDaProgramacao = transformaHorarioEmString(
                horarioEData.start_time
            );

            if (
                inicioDaProgramacao <= horarioAoVivo &&
                horarioAoVivo <= fimDaProgramacao
            ) {
                return <div className={styles.AoVivo}>AO VIVO</div>;
            }
        }
    };

    const InformacoesDoPrograma = (programa) => {
        const programacaoHora = converterTimestamp.horario(programa.start_time);
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
                {verificaSeEstaAoVivo(programa)}
            </section>
        );
    };

    const Programacao = (programacaoInteira) => {
        const programacaoFiltrada = ProgramacaoAFiltar(programacaoInteira);
        if (programacaoFiltrada) {
            return programacaoFiltrada.map((program, index) => {
                return {
                    key: index,
                    label: InformacoesDoPrograma(program),
                    children: InformacoesAdicionaisDoPrograma(program),
                };
            });
        }
    };

    const verificaProgramacao = () => {
        let programacaoVindaComADataAtual;
        let programacaoVindaComADataAnterior;
        let programacaoInteira;
        if (dadosDoDiaAtual && dadosDoDiaAnterior) {
            if (dadosDoDiaAtual.programme && dadosDoDiaAnterior.programme) {
                programacaoVindaComADataAtual =
                    dadosDoDiaAtual.programme.entries;

                programacaoVindaComADataAnterior =
                    dadosDoDiaAnterior.programme.entries;
            } else if (dadosDoDiaAtual.entries && dadosDoDiaAnterior.entries) {
                programacaoVindaComADataAtual = dadosDoDiaAtual.entries;
                programacaoVindaComADataAnterior = dadosDoDiaAnterior.entries;
            }
            programacaoInteira = new Array(
                ...programacaoVindaComADataAnterior,
                ...programacaoVindaComADataAtual
            );
        } else if (dadosDoDiaAtual.entries) {
            programacaoInteira = dadosDoDiaAtual.entries;
        }

        return Programacao(programacaoInteira);
    };

    return (
        <section className={styles.ListaDeProgramacaoContainer}>
            {carregandoDiaAtual && carregandoDiaAnterior ? (
                <Loading />
            ) : error ? (
                <ComponenteErro />
            ) : (
                <div className={styles.Collapse}>
                    <Collapse accordion items={verificaProgramacao()} />{" "}
                </div>
            )}
        </section>
    );
}
