import './card.css';

type CardProps = {
    imageURL: string
    imageCode: string
}

const Card = (props: CardProps): JSX.Element => {
    return (
        <>
            <div>
                <img src={props.imageURL} alt={props.imageCode} className='playing-card' />
            </div>
        </>
    );
}

export default Card;