import './banner.css'

type BannerProps = {
    message: string
}

const Banner = (props: BannerProps): JSX.Element => {
    return (
        <>
            <div className='banner-container'>
                <p>{props.message}</p>
            </div>
        </>
    )
}

export default Banner;