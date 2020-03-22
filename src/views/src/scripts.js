M.Slider.init(document.querySelectorAll('.slider'), {
    interval: 5000,
    height: 300,
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
}
