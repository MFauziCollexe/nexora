import "../css/app.css";
import "./bootstrap";

import { createApp, h } from "vue";
import { createInertiaApp, router } from "@inertiajs/vue3";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) => {
        const pages = import.meta.glob([
            "./Pages/**/*.vue",
            "./modules/**/pages/**/*.vue",
        ]);

        const fromPages = `./Pages/${name}.vue`;
        if (pages[fromPages]) return pages[fromPages]();

        const [domain, ...rest] = name.split("/");
        const fromModules = `./modules/${domain.toLowerCase()}/pages/${rest.join("/")}.vue`;
        if (pages[fromModules]) return pages[fromModules]();

        throw new Error(`Page not found: ${name}`);
    },

    setup({ el, App, props, plugin }) {
        const ziggy = props.initialPage.props.ziggy;

        return createApp({
            render: () => h(App, props),
        })
            .use(plugin)
            .use(ZiggyVue, {
                ...ziggy,
                location: new URL(ziggy.location),
            })
            .mount(el);
    },

    progress: {
        color: "#8b5cf6",
    },
});
