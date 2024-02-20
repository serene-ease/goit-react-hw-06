import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

import { addContact } from '../../redux/contactsSlice';
import style from './ContactForm.module.css';



const ContactForm = ({ onAdd }) => {
  const dispatch = useDispatch()
  const handleAdd = () => (values, actions) => {
    dispatch(addContact({ id: nanoid(5), ...values }));
    actions.resetForm();
}

  const formFields = [
    { name: 'contactname', type: 'text', id: nanoid(), decor: 'Username' },
    { name: 'number', type: 'tel', id: nanoid(), decor: 'Number' },
  ];

  const validationSchema = Yup.object().shape({
    contactname: Yup.string()
      .min(3, 'Name would be 3 symbols or longer')
      .max(50, 'Too much sympols, please input name between 3 and 50 sybols!')
      .required('This area is required! type name here please'),
    number: Yup.number()
      .min(9, 'Not enough symbols to be a phone number!')
      .required('Adding contact without number senseles here.'),
  });

 

  return (
    <Formik
      initialValues={{
        contactname: '',
        number: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        onAdd({ id: nanoid(), ...values });
        actions.resetForm();
      }}
    >
      <Form className={style.form} onSubmit={handleAdd}>
        <ul className={style.list}>
          {formFields.map(curField => {
            return (
              <li className={style.listItem} key={curField.id}>
                <label className={style.label} htmlFor={curField.id}>{curField.decor}</label>
                <Field className={style.input} name={curField.name} type={curField.type} id={curField.id} />
                <ErrorMessage className={style.error} name={curField.name} component="p" />
              </li>
            );
          })}
        </ul>

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm