import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './header.scss';
import '../../styles/style.scss';

const Header = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState('Прежде чем действовать, надо понять');

const toggleVisibility = () => {
  setIsVisible(isVisible => !isVisible);
}

return (
  <>
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
          <h1 className="header__greeting"><span>Здравствуйте,</span> Пользователь №3596941</h1>
          <button onClick={toggleVisibility} className='header__btn'>
            <a className="header__link" to="/home">Сменить статус</a>
          </button>
        </div>

        <div style={{'display': !isVisible ? 'block' : 'none'}} className="status__label-container">
          <div className="status__triangle"></div>
          <label className='status__label'>{status}</label>
        </div>

        <div style={{'display': isVisible ? 'flex' : 'none'}} className='status__wrapper'>
          <Formik
            initialValues={{
              status: ''
            }}
            validationSchema={Yup.object({
              status: Yup.string()
                      .max(40, 'Максимальное количество символов: 40')
                      .required('Введите новый статус')
            })}
            onSubmit={({ status }, { resetForm }) => {
              setStatus(status);
              resetForm();
              setIsVisible(false);
            }}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form className='status'>
                <div className='status__current'>Ваш текущий статус: <span>{status}</span></div>
                <Field
                  id='status'
                  name='status'
                  placeholder='Введите новый статус'
                  value={values.status}
                  onChange={handleChange}
                  className={touched.status && errors.status ? 'status__input-error' : 'status__input'}
                />
                <ErrorMessage component="div" className="status__error" name="status" />
                <button className='status__btn' type='submit'>Изменить</button>
              </Form>
            )}
          </Formik>
        </div>

      </div>
    </div>
  </>
);

};

export default Header;