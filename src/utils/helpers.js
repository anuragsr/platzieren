const wc = window.console
export const l = console.log.bind(wc)
export const cl = console.clear.bind(wc)
export const env = {
  CURR: "LOCAL",
  // CURR: "ECA",
  // CURR: "PROD",
  LOCAL: {
    FE_URL: "http://127.0.0.1:8080/#!/l/",
    API_URL: "http://localhost/platzieren-be/backend/",
  },
  ECA: {
    FE_URL: "http://eca.in",
    API_URL: "http://eca.in",
  },
  PROD: {
    FE_URL: "https://untermietvertrag.com/#!/l/",
    API_URL: "https://untermietvertrag.com/backend/",
  }
}
