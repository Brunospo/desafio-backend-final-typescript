import yup from '../config/yup';

export const validateAuthenticationFields = yup.object().shape({
	email: yup.string().email('Formato de email inválido').required(),
	senha: yup.string().required()
});