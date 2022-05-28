import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import store from './Redux/store'
import {Provider} from 'react-redux'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </BrowserRouter>
        </ApolloProvider>
    </Provider>
);
