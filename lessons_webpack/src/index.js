import '../index.css';
import jsSrc from '../assets/js.jpg';

const title = document.createElement('h1');
title.textContent = 'I love JavaScript';

const imgHtml = document.createElement('img');
imgHtml.src = jsSrc;

document.body.append(title, imgHtml);

console.log('Hello world');