import { reactive } from 'vue'

const formatJson = (value) => JSON.stringify(value ?? {}, null, 2)

export function useEndpointExecutor() {
    const requestBodies = reactive({})
    const executeResults = reactive({})
    const executing = reactive({})
    const authState = reactive({
        token: typeof localStorage !== 'undefined' ? localStorage.getItem('nexora_api_token') ?? '' : '',
    })

    const resetRequestBody = (endpoint) => {
        requestBodies[endpoint.path] = endpoint.requestExample ? formatJson(endpoint.requestExample) : ''
    }

    const ensureRequestBody = (endpoint) => {
        if (!requestBodies[endpoint.path]) {
            resetRequestBody(endpoint)
        }
    }

    const executeEndpoint = async (endpoint) => {
        executing[endpoint.path] = true
        executeResults[endpoint.path] = null

        try {
            const data = endpoint.requestExample ? JSON.parse(requestBodies[endpoint.path] || '{}') : undefined
            const response = await window.axios.request({
                method: endpoint.method.toLowerCase(),
                url: endpoint.path,
                data,
                headers: {
                    Accept: 'application/json',
                    ...(endpoint.auth && authState.token ? { Authorization: `Bearer ${authState.token}` } : {}),
                },
            })

            if (response.data?.access_token) {
                authState.token = response.data.access_token
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('nexora_api_token', response.data.access_token)
                }
            }

            executeResults[endpoint.path] = {
                ok: true,
                status: response.status,
                statusText: response.statusText,
                data: response.data,
                headers: response.headers,
            }
        } catch (error) {
            executeResults[endpoint.path] = {
                ok: false,
                status: error.response?.status ?? 'Error',
                statusText: error.response?.statusText ?? error.message,
                data: error.response?.data ?? { message: error.message },
                headers: error.response?.headers ?? {},
            }
        } finally {
            executing[endpoint.path] = false
        }
    }

    return {
        authState,
        requestBodies,
        executeResults,
        executing,
        ensureRequestBody,
        resetRequestBody,
        executeEndpoint,
    }
}
