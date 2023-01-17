import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import {MantineProvider} from "@mantine/core";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <MantineProvider
        theme={{
            fontFamily: '\'Product Sans\', sans-serif;',
            fontFamilyMonospace: '\'Product Sans\', sans-serif;',
            headings: { fontFamily: '\'Product Sans\', sans-serif;' },
        }}
    >
    <App />
    </MantineProvider>,
)
