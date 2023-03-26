import './card.css';

type CardProps = {
    imageURL: string
    imageCode: string
    loading: boolean
    onLoad: () => void
}

const Card = (props: CardProps): JSX.Element => {
    const loadStyle = props.loading ? 'loading' : 'loaded';
    return (
        <>
            <div className={loadStyle}>
                <img src={props.imageURL} alt={props.imageCode} className='playing-card' onLoad={() => props.onLoad()} />
            </div>
        </>
    );
}

export default Card;