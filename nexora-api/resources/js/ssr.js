import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import { createSSRApp, h } from "vue";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
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

        setup({ App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });
        },
    }),
);
