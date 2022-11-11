import yup from '../config/yup';

export const validateImageBody = yup.object().shape({
	imagem: yup.string().required('imagem é um campo obrigatório')
});