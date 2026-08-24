import "./header.css";

export function headerStyle() {
  const header = document.getElementById("header") as HTMLElement;

  if (header) {
    header.classList.add("cf-styler-header");
  }

  const body = document.querySelector("#body") as HTMLElement;
  if (body) {
    body.classList.add("cf-styler-body");
  }
}
