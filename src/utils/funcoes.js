export function formataData(data) {
    return data.toLocaleDateString("pt-BR").split("/").reverse().join("-");
}

export const Data = new Date();

export function transformaEmData(data) {
    return new Date(data);
}

export function transformaEmStringNumericaComDuasCasas(numero) {
    return `0${numero}`;
}

export function transformaHorarioEmString(data) {
    const horas =
        transformaEmData(data * 1000).getHours() < 10
            ? transformaEmStringNumericaComDuasCasas(
                  transformaEmData(data * 1000).getHours()
              )
            : transformaEmData(data * 1000).getHours();
    const minutos =
        transformaEmData(data * 1000).getMinutes() < 10
            ? transformaEmStringNumericaComDuasCasas(
                  transformaEmData(data * 1000).getMinutes()
              )
            : transformaEmData(data * 1000).getMinutes();
    const segundos =
        transformaEmData(data * 1000).getSeconds() < 10
            ? transformaEmStringNumericaComDuasCasas(
                  transformaEmData(data * 1000).getSeconds()
              )
            : transformaEmData(data * 1000).getSeconds();

    const horario = `${horas}:${minutos}:${segundos}`;
    return horario;
}
