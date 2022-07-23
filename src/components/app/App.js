import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404, SinglePage } from '../pages/'

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="comics" element={<ComicsPage />} />
                        <Route path="comics/:id" element={<SinglePage section="comics" />} />
                        <Route path="characters/:id" element={<SinglePage section="characters" />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;