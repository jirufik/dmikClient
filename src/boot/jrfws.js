import Vue from 'vue'
import {JRFWSBrowserClient} from 'jrfws2'
import {host, port} from '../../config'

const jrfws = new JRFWSBrowserClient();
jrfws.startClient({url: `${host}:${port}`, browserClient: true});

Vue.prototype.$jrfws = jrfws;
