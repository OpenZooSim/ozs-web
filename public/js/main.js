(() => {
    console.log('main.js loaded');
    const app = document.getElementById('txtTest');
    if (app) {
        app.innerText = 'LOADED FROM MAIN';
    }
})();
