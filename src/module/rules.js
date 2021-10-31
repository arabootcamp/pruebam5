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
  v => !!v || 'Cupos es requerido',
  v => (v  && v >= 0) ||
  'Debe ingresar un número mayor o igual a cero',
];

export const funcInscritosRules = (cupos) => {
  return [
    v => !!v || 'Inscritos es requerido',
    v => (v && v >= 0) || 'Debe ingresar un número mayor o igual a cero',
    v => (v <= cupos || 'Inscritos debe ser menor o igual que Cupos'),
    //v =>  {console.log(v)}
  ];
};

export const costoRules = [
  v => !!v || 'Costo es requerido',
  v => (v && v >= 0) || 'Debe ingresar un número mayor o igual a cero',
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