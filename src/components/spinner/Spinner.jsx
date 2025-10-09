import ghost from '../../resources/img/Ghost.gif';

const Spinner = () => {
    return (
        <img 
            src={ghost} 
            alt="Loading..." 
            style={{
                display: 'block',
                margin: '0 auto',
                background: 'none',
                width: '100px',      // підбери розмір, щоб гіфка не була велика
                height: '100px',
                objectFit: 'contain'
            }}
        />
    );
};

export default Spinner;

