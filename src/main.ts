// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { keepAwake, allowSleepAgain } from "nativescript-insomnia";
import { AppModule } from "./app/app.module";
import { on as applicationOn, launchEvent, exitEvent, ApplicationEventData } from "tns-core-modules/application";

// A traditional NativeScript application starts by initializing global objects,
// setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization:
// modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together,
// so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
applicationOn(launchEvent, (args: ApplicationEventData) => {
    // if (args.android) {
    //     // For Android applications, args.android is an android.content.Intent class.
    //     console.log("Launched Android application with the following intent: " + args.android + ".");
    // } else if (args.ios !== undefined) {
    //     // For iOS applications, args.ios is NSDictionary (launchOptions).
    //     console.log("Launched iOS application with options: " + args.ios);
    // }

    keepAwake().then(function() {
        // console.log("Insomnia is active");
    });

});

applicationOn(exitEvent, (args: ApplicationEventData) => {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        // console.log("Activity: " + args.android);
        // if (args.android.isFinishing()) {
        //     console.log("Activity: " + args.android + " is exiting");
        // } else {
        //     console.log("Activity: " + args.android + " is restarting");
        // }
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        // console.log("UIApplication: " + args.ios);
    }

    allowSleepAgain().then(function() {
        // console.log("Insomnia is inactive, good night!");
    })
});

platformNativeScriptDynamic().bootstrapModule(AppModule);
