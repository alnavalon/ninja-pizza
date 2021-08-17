import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({onClick, className, outline, add, circle, children}) => {
    return (
        <button
        onClick={onClick}
        className={classNames('button', className, {
            'button--outline': outline,
            'button--add': add,
            'button--circle': circle
        })}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func
}

export default Button;