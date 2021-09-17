import React, {useState} from 'react'
import logo from './logo.svg'
import './App.css'

export const App: React.FC = () => {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Hello Vite + React!</p>
                <p>
                    <button type="button" onClick={() => setCount((count) => count + 1)}>
                        count is: {count}
                    </button>
                </p>
            </header>
        </div>
    )
};

