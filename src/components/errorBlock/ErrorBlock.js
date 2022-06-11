import img from './error.gif'

const ErrorBlock = () => {
    return (
        <img
            src={img} alt="Error"
            style={{
                display: 'block',
                width: "250px",
                height: "250px",
                objectFit: 'contain',
                margin: "0 auto"
            }}
        />
    )
}

export default ErrorBlock