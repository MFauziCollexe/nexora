import { reactive } from "vue";

const formatJson = (value) => JSON.stringify(value ?? {}, null, 2);

const getEndpointKey = (endpoint) => `${endpoint.method}:${endpoint.path}`;

export function useEndpointExecutor() {
    const requestBodies = reactive({});
    const requestParameters = reactive({});
    const executeResults = reactive({});
    const executing = reactive({});

    const resetRequestBody = (endpoint) => {
        const key = getEndpointKey(endpoint);
        requestBodies[key] = endpoint.requestExample
            ? formatJson(endpoint.requestExample)
            : "";
    };

    const ensureRequestBody = (endpoint) => {
        const key = getEndpointKey(endpoint);
        if (!requestBodies[key]) {
            resetRequestBody(endpoint);
        }
    };

    const ensureRequestParameters = (endpoint) => {
        const key = getEndpointKey(endpoint);
        if (!requestParameters[key]) {
            requestParameters[key] = {};
            endpoint.parameters?.forEach((param) => {
                requestParameters[key][param.name] =
                    param.example ?? param.schema?.example ?? "";
            });
        }
    };

    const executeEndpoint = async (endpoint) => {
        const key = getEndpointKey(endpoint);
        ensureRequestBody(endpoint);
        ensureRequestParameters(endpoint);

        executing[key] = true;
        executeResults[key] = null;

        try {
            const params = requestParameters[key] || {};
            let url = endpoint.path;

            endpoint.parameters?.forEach((param) => {
                if (param.in === "path") {
                    url = url.replace(
                        `{${param.name}}`,
                        encodeURIComponent(params[param.name] ?? ""),
                    );
                }
            });

            const query = new URLSearchParams();
            endpoint.parameters?.forEach((param) => {
                if (
                    param.in === "query" &&
                    params[param.name] != null &&
                    params[param.name] !== ""
                ) {
                    query.append(param.name, params[param.name]);
                }
            });

            if (query.toString()) {
                url += `?${query.toString()}`;
            }

            const data = endpoint.requestExample
                ? JSON.parse(requestBodies[key] || "{}")
                : undefined;
            const response = await window.axios.request({
                method: endpoint.method.toLowerCase(),
                url,
                data,
                headers: {
                    Accept: "application/json",
                },
            });

            executeResults[key] = {
                ok: true,
                status: response.status,
                statusText: response.statusText,
                data: response.data,
                headers: response.headers,
            };
        } catch (error) {
            executeResults[key] = {
                ok: false,
                status: error.response?.status ?? "Error",
                statusText: error.response?.statusText ?? error.message,
                data: error.response?.data ?? { message: error.message },
                headers: error.response?.headers ?? {},
            };
        } finally {
            executing[key] = false;
        }
    };

    return {
        requestBodies,
        requestParameters,
        executeResults,
        executing,
        ensureRequestBody,
        ensureRequestParameters,
        resetRequestBody,
        executeEndpoint,
    };
}
