export function formataData(data) {
    return data.toLocaleDateString("pt-BR").split("/").reverse().join("-");
}
