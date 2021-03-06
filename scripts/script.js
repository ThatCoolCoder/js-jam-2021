document.title = config.gameName;

wrk.GameEngine.init(config.targetSize, 1, config.bgColor);

// Resize stuff
function resizeCanvas() {
    var targetAspectRatio = config.targetSize.x / config.targetSize.y;
    var availableArea = wrk.v.copySub(wrk.dom.viewportSize(), config.padding);

    // There is a weird bug on chromebooks where the window size is too big.
    // To counteract that, if on chromeOS, remove an amount to fix this
    if (/\bCrOS\b/.test(navigator.userAgent)) {
        wrk.v.sub(availableArea, config.chromebookExtraPadding);
    }

    var availableAspectRatio = availableArea.x / availableArea.y;

    // If the target is 'wider' than the window
    if (targetAspectRatio > availableAspectRatio) {
        var sizeMult = availableArea.x / config.targetSize.x;
    }
    // If the target is 'taller' than the window
    else {
        var sizeMult = availableArea.y / config.targetSize.y;
    }
    wrk.GameEngine.setGlobalScale(sizeMult);
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

var settings = {
    muted : false
}

// Setup scenes
var mainScene = new MainScene();
var levelSelectScene = new LevelSelectScene(new BoidsBackground());
var titleScreen = new TitleScreen(new BoidsBackground());
var pauseMenu = new PauseMenu(new BoidsBackground());
var loadingScene = new LoadingScene();

// Wait for a user interaction before starting music
var hasStartedMainTheme = false;
wrk.GameEngine.mouse.onPointerUp.add(() => {
    if (! hasStartedMainTheme) {
        setTimeout(() => {
            config.mainThemeSong.loop();
            hasStartedMainTheme = true;
        }, 100);
    }
})

wrk.GameEngine.selectScene(loadingScene);
setTimeout(() =>{
    wrk.GameEngine.selectScene(titleScreen);
}, config.loadingSceneDuration);