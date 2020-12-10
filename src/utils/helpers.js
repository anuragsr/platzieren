const wc = window.console
export const l = console.log.bind(wc)
export const cl = console.clear.bind(wc)
export const env = {
  CURR: "LOCAL",
  // CURR: "ECA",
  // CURR: "PROD",
  LOCAL: { API_URL: "http://localhost:80" },
  ECA: { API_URL: "http://eca.in" },
  PROD: { API_URL: "http://yoururl.com:8080" }
}
