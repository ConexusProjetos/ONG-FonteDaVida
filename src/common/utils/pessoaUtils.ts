export default {
  validarCpf(cpf: string) {
    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto: number;

    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf[i]) * (10 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf[10]);
  },
  validarSeEDeMaior(dataDeNascimento: Date): boolean {
    const hoje = new Date();

    let idade = hoje.getFullYear() - dataDeNascimento.getFullYear();

    const mes = hoje.getMonth() - dataDeNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataDeNascimento.getDate())) {
      idade--;
    }

    return idade >= 18;
  },
};
