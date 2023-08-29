import MainPage from "../components/MainPage.svelte";
import Options from "../components/Options.svelte";

// Action popup
// https://developer.chrome.com/docs/extensions/reference/action/

function render() {
    const target = document.getElementById("app");

    if (target) {
        {
            new MainPage({
                target
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", render);
