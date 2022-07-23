import { Helmet } from "react-helmet"
import ErrorBlock from "../errorBlock/ErrorBlock"

const Page404 = () => {
    return (
        <>
            <Helmet>
                <title>Page not found 404</title>
            </Helmet>
            <h2>Page doesn`t exist...</h2>
            <ErrorBlock />
        </>
    )
}

export default Page404