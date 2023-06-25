import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

import '../../styles/style.scss';
import './form.scss';

const MyTextInput = ({label, descr, ...props}) => {
  const [field, meta] = useField(props); // объект field - содержащий значения и обработчики событий, которые нужно присвоить инпуту (value, onChange, onBlur...), а второй элемент - это объект meta, содержащий информацию об ошибке и состоянии поля (touched).
  return (
      <>
        <div className='form__input-tips-wrapper'>
          <div className='form__input-wrapper'>
            <h3 className='form__title' htmlFor={props.name}>{label}</h3>
            <input {...props} {...field}/>
            {meta.error && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
          </div>
          <div className='form__input-tips'>{descr}</div>
        </div>
      </>
  )
};

const CustomForm = () => {
  return (
    <Formik>
      <Form className='form'>
        <div className='container'>
          <div className='form__wrapper'>
            <div className='form__select-wrapper'>
              <h3 className='form__title'>Ваш город</h3>
              <Field
                id="city"
                name="city"
                as="select"
                className='form__select'
              >
                  <option>New-York</option>
                  <option>Moscow</option>
                  <option>Paris</option>
              </Field>
            </div>
            <div className='divider'></div>
            <MyTextInput
              label='Пароль'
              descr='Ваш новый пароль должен содержать не менее 5 символов.'
              id="password"
              name="password"
              type="number" 
              className='form__input'  
            />

            <MyTextInput
              label='Пароль еще раз'
              descr='Повторите пароль, пожалуйста, это обезопасит вас с нами
              на случай ошибки.'
              id="password"
              name="password"
              type="number"
              className='form__input'
            />
            <div className='divider'></div>
            <MyTextInput
              label='Электронная почта'
              descr='Можно изменить адрес, указанный при регистрации. '
              id="email"
              name="email"
              type="text"
              className='form__input'
            />
            <div className='form__checkbox-tips-wrapper'>
              <div className='form__checkbox-wrapper'>
                <h3 className='form__title'>Я согласен</h3>
                <Field
                  name="checkbox"
                  type='checkbox'
                  className='form__checkbox'
                >
                </Field>
              </div>
              <div className='form__checkbox-tips'>принимать актуальную информацию на емейл</div>
            </div>
            <div className='form__btn-wrapper'>
              <button className='form__btn'>Изменить</button>
              <div className='form__btn-tip'>последние изменения 15 мая 2023 в 14:55:17</div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default CustomForm;