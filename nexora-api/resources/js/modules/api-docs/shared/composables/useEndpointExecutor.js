import { reactive } from "vue";

const formatJson = (value) => JSON.stringify(value ?? {}, null, 2);

const getEndpointKey = (endpoint) => `${endpoint.method}:${endpoint.path}`;

const getResponseDefinition = (endpoint, status) =>
    endpoint.responses?.find(
        (response) => String(response.code) === String(status),
    );

const shortenModelNamespace = (message) =>
    message
        .replace(/\[([A-Za-z_\\][A-Za-z0-9_\\]*)\]/g, (_, model) => {
            const segments = model.split("\\");

            return `[${segments.at(-1)}]`;
        })
        .replace(/^(No query results for model .+?)(?<!\.)$/, "$1.");

const normalizeResponseData = (data) => {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return data;
    }

    const normalized = { ...data };

    if (typeof normalized.message === "string") {
        normalized.message = shortenModelNamespace(normalized.message);
    }

    if (normalized.exception) {
        return normalized.message ? { message: normalized.message } : {};
    }

    return normalized;
};

const dataOrExample = (data, responseDefinition) => {
    if (data !== undefined && data !== null && data !== "") {
        return normalizeResponseData(data);
    }

    return responseDefinition?.example ?? {};
};

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

            const response = await window.axios.post(
                "/docs/try-it-out",
                {
                    method: endpoint.method.toUpperCase(),
                    url,
                    data,
                },
                {
                    headers: {
                        Accept: "application/json",
                    },
                    validateStatus: () => true,
                },
            );

            const result = response.data ?? {};
            const status = result.status ?? response.status;
            const responseDefinition = getResponseDefinition(endpoint, status);

            executeResults[key] = {
                ok: status >= 200 && status < 300,
                status,
                statusText:
                    responseDefinition?.description ??
                    result.statusText ??
                    response.statusText,
                data: dataOrExample(result.data, responseDefinition),
                headers: result.headers ?? {},
            };
        } catch (error) {
            const status = error.response?.status ?? "Error";
            const responseDefinition = getResponseDefinition(endpoint, status);

            executeResults[key] = {
                ok: false,
                status,
                statusText:
                    responseDefinition?.description ??
                    error.response?.statusText ??
                    error.message,
                data: dataOrExample(
                    error.response?.data ?? { message: error.message },
                    responseDefinition,
                ),
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
