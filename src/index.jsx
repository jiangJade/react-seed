import React from 'react';
import getRouter from './router/Routers';
import { render } from 'react-dom';

render(getRouter(), document.getElementById('app'));