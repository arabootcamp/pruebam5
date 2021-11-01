//Login y Register
export const emailRules = [
  v => !!v || 'E-mail es requerido',
  v => /.+@.+\..+/.test(v) || 'E-mail debe ser valido',
];

export const passwordRules = [
  value => !!value || 'Password es requerida',
  v => (v && v.length >= 6) || 'La password debe tener mínimo 6 caracteres',
  v => (v && v.length <= 20) || 'La password debe tener máximo 20 caracteres',
];

//Administration y Edition
export const nombreRules = [
  v => !!v || 'El nombre es requerido',
  v => (v && v.length >= 2) || 'El nombre debe tener al menos 2 caracteres',
];

export const urlRules = [
  v => !!v || 'La URL es requerido',
  v => (v && v.length >= 5) || 'La URL debe tener al menos 5 caracteres',
];

export const cuposRules = [
    v => (!(isNaN(parseInt(v)))) || 'Cupos es requerido',
    v => (Number.isInteger(parseFloat(v))) || 'Cupos debe ser entero',
    v => (parseInt(v) >= 0) || 'Cupos debe ser mayor o igual a cero'
];

export const funcInscritosRules = (cupos) => {
  return [
    //determina vacio con true
    v => (!(isNaN(parseInt(v)))) || 'Inscritos es requerido',
    //Entero
    v => (Number.isInteger(parseFloat(v))) || 'Inscritos debe ser entero',
    // 0 >= X <= Cupos
    v => ((parseInt(v) >= 0) && (parseInt(v) <= cupos)) || 'Inscritos debe ser mayor o igual a cero y menor o igual que Cupos'
  ];
};

export const costoRules = [
    v => (!(isNaN(parseInt(v)))) || 'Costo es requerido',
    v => (Number.isInteger(parseFloat(v))) || 'Costo debe ser entero',
    v => (parseInt(v) >= 0) || 'Costo debe ser mayor o igual a cero'
];

export const codigoRules = [
  v => !!v || 'Codigo es requerido',
  v => (v && v.length >= 2) || 'El codigo debe tener al menos 2 caracteres',
];

export const descripcionRules = [
  v => !!v || 'Descripción es requerida',
  v => (v && v.length >= 2) || 'La descripción debe tener al menos 2 caracteres',
];

export const fechaRegistroRules = [
  v => !!v || 'Fecha de registro es requerida',
  v => (v && v.length >= 10 && /^\d{2}-\d{2}-\d{4}$/gmi.test(v)) || 'La fecha de registro debe tener formato dd-mm-aaaa',
];

export const duracionRules = [
  v => !!v || 'Duración es requerida',
  v => (v && v.length >= 2) || 'La duración debe tener al menos 2 caracteres',
];