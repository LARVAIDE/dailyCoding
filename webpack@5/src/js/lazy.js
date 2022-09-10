import "../styles/a.css";

const btn = document.createElement("button");
btn.className = "block";
btn.innerHTML = "按需加载";
document.body.appendChild(btn);

btn.addEventListener("click", () => {
  import(
    /* webpackChunkName: 'utilsPrefetch' */
    /* webpackPrefetch: true */
    "./utils"
  ).then(({ default: element }) => {
    console.log(element);
    document.body.appendChild(element);
  });
});
