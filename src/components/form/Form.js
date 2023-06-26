import { useState, useEffect } from 'react';
import { Formik, Form, Field, useField } from 'formik';
import * as Yup from 'yup';

import data from '../../cities.json';

import '../../styles/style.scss';
import './form.scss';

const MyTextInput = ({label, descr, ...props}) => {
  const [field, meta] = useField(props); // объект field - содержащий значения и обработчики событий, которые нужно присвоить инпуту (value, onChange, onBlur...), а второй элемент - это объект meta, содержащий информацию об ошибке и состоянии поля (touched).
  return (
    <div className='form__input-tips-wrapper'>
      <div className='form__input-wrapper'>
        <h3 className='form__title' htmlFor={props.name}>{label}</h3>
        <div className='form__input-container'>
          <input 
          {...props} 
          {...field}
          className={meta.error && meta.touched ? 'form__input-error' : 'form__input'}
          />
          {meta.error && meta.touched ? (
              <div className='form__error'>{meta.error}</div>
          ) : null}
        </div>
        </div>
      <div className='form__input-tips'>{descr}</div>
    </div>
  )
};

const CustomForm = () => {

  const [cities, setCities] = useState([]);
  const [lastSubmitDate, setLastSubmitDate] = useState(null);

  useEffect(() => {
    const filteredByPop = data.filter(city => parseInt(city.population) >= 50000);

    const highPopCity = filteredByPop.reduce((prevCity, currentCity) => {
      const prevPopulation = parseInt(prevCity.population);
      const currentPopulation = parseInt(currentCity.population);
    
      if (currentPopulation > prevPopulation) {
        return currentCity;
      } else {
        return prevCity;
      }
    }, { "city": "Артёмовск", "population": "0" }); // Это значение передается как аккумулятор (prevCity)
    
    filteredByPop.sort((a, b) => a.city.localeCompare(b.city));

    const sortedCities = filteredByPop.filter(city => city.population !== highPopCity.population);

    const res = [highPopCity, ...sortedCities]

    setCities(res);
  }, []);

  const getSelectCities = () => {
    return (
      cities.map((item) => {
        return (
          <option key={item.city} value={item.city}>{item.city}</option>
        )
      })
    )
  }

  const onSubmit = (values, { resetForm }) => {
    console.log(JSON.stringify(values, null, 2));

    const currentDate = new Date();
    const modifiedDate = currentDate.toISOString().replace('T', ' ').slice(0, -5);
    setLastSubmitDate(modifiedDate);

    resetForm();
  };

  return (
    <Formik
    initialValues = {{
      city: 'Красноярск',
      password: '',
      checkPassword: '',
      email: '', 
      checkbox: false
    }}
    validationSchema = {Yup.object({
        city: Yup.string()
                .required('Выберите Ваш город'),
        password: Yup.string()
                .min(5, 'Используйте не менее 5 символов')
                .required('Укажите пароль'),
        checkPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
        email: Yup.string()
                .email('Неверный E-mail')
                .required('Укажите E-mail')
    })}
    onSubmit={onSubmit}
    >
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
                {getSelectCities()}
              </Field>
            </div>
            <div className='divider'></div>
            <MyTextInput
              label='Пароль'
              descr='Ваш новый пароль должен содержать не менее 5 символов.'
              id="password"
              name="password"
            />
            <MyTextInput
              label='Пароль еще раз'
              descr='Повторите пароль, пожалуйста, это обезопасит вас с нами
              на случай ошибки.'
              id="checkPassword"
              name="checkPassword"
            />
            <div className='divider'></div>
            <MyTextInput
              label='Электронная почта'
              descr='Можно изменить адрес, указанный при регистрации. '
              id="email"
              name="email"
              type="text"
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
              <button type='submit' className='form__btn'>Изменить</button>
              <div className='form__btn-tip'>Последние изменения {lastSubmitDate}</div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default CustomForm;