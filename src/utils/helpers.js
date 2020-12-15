const wc = window.console
export const l = console.log.bind(wc)
export const cl = console.clear.bind(wc)
export const env = {
  CURR: "LOCAL",
  // CURR: "ECA",
  // CURR: "PROD",
  LOCAL: {
    FE_URL: "http://localhost:8080/#!/l/",
    IMG_URL: "http://localhost:8080/#!/i/",
    API_URL: "http://localhost/platzieren-be/backend/",
  },
  ECA: {
    FE_URL: "http://eca.in",
    IMG_URL: "http://eca.in",
    API_URL: "http://eca.in",
  },
  PROD: {
    FE_URL: "https://platzieren.com/#!/l/",
    IMG_URL: "https://platzieren.com/#!/i/",
    API_URL: "https://platzieren.com/backend/",
  }
}
