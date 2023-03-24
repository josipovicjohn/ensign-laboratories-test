import './button.css';

type ButtonType = 
    | 'draw'
    | 'higher'
    | 'lower'
    | 'reset'

type ButtonProps = {
    type: ButtonType
    disabled: boolean,
    onClick: () => void
}

const Button = (props: ButtonProps): JSX.Element => {

    const buttonTitle = props.type.toUpperCase();

    const getButtonClassName = (buttonType: ButtonType, disabled: boolean): string => {
        if (disabled) {
            return 'disabled';
        }

        return buttonType;
    };

    return (
        <>
            <div>
                <button 
                    type="button" 
                    className={`custom-button ${getButtonClassName(props.type, props.disabled)}`} 
                    onClick={() => props.onClick()}>
                        {buttonTitle}
                </button>
            </div>
        </>
    );
};

export default Button;