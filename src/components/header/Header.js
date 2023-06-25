import './header.scss';
import '../../styles/style.scss';

const Header = () => {
  const random = Math.floor(Math.random() * 300001);
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header__wrapper">
            <h1 className="header__greeting"><span>Здравствуйте</span>, Пользователь №{random}</h1>
            <button className='header__btn'>
              <a className="header__link" to="/home">Сменить статус</a>
            </button>
          </div>

            <div style={{'display': 'none'}} className='status__wrapper'>
              <div className='status'>
                <div className='status__current'>Ваш текущий статус: <span>статус</span></div>
                <input placeholder='Введите новый статус' className='status__input'/>
                <button className='status__btn' type='submit'>Изменить</button>
              </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default Header;