# Slides
![image](https://github.com/globalworming/20230628-meetup-refactor-playwright-js-to-screenplay/assets/2108984/f7c49a67-195f-490e-9e84-c92c90b0cb0e)


![image](https://github.com/globalworming/20230628-meetup-refactor-playwright-js-to-screenplay/assets/2108984/6b39f992-0fb8-45f5-b727-cb0625ca4fae)

![image](https://github.com/globalworming/20230628-meetup-refactor-playwright-js-to-screenplay/assets/2108984/159d89bb-fdcc-4ff9-b21e-3aa7eca137a5)


* [ ] show [SUT](http://localhost:8881)
* [ ] show [test](./tests/prestashop.spec.js)
* [ ] run test
* [ ] show report
* [ ] start POM
  * it's ProductSlider, not Home because components!
* [ ] refactor all to POM
  * "ich hab da mal was vorbreitet"
* [ ] adapt the report, use `test.step`
  * introduce everywhere
* [ ] create steps package, point out duplication in function names and test.step
* [ ] describe screenplay
  * ![image](https://github.com/globalworming/20230628-meetup-refactor-playwright-js-to-screenplay/assets/2108984/dad7140d-57ec-4eb7-ba94-ce5c4d500b41)
  * we'll do a minimalistic implementation
  * ignore abilities and questions
* implement:
  * [ ] start with new Actor(name)
  * [ ] add actor attemptsTo for first step
  * [ ] add test.step
  * [ ] add actor has page
  
```javascript
import {test} from "@playwright/test";

export class Actor {
    page;

    constructor(name) {
        this.name = name;
    }

    attemptsTo = async (...tasks) => {
        for (const task of tasks) {
            const transform = str => str.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);
            let title = this.name + " attempts to " + (task.args !== undefined ?
                transform(task.constructor.name) + " " + JSON.stringify(task.args) :
                transform(task.constructor.name));
            await test.step(title, async () => await task.performAs(this))
        }
    }
}
```
* [ ] add second step, call both in attemptsTo
* [ ] add an ensure task
* [ ]replace FIllPersonalData, introduce notepad, replace product name
* [ ] replace all in order product
  * see. no POM needed
    * well, I lied, show locator object
* [ ] this is what the script might look like when we use screenplay (result, main branch)
* [ ] questions? and did you just add an assert in the steps

* benefits:
  * easy modeling multiple actors, user and admin
  * nice reports
  * does also encompas other interfaces, write steps for API, DB, ....
* drawbacks
  * tons of actions, findability, accidental duplication...
  * stacktrace indirection, another layer, error in `attemptsTo`
  * sharing state between steps, remember/recall is unusual and might get unwieldy
 
 ![image](https://github.com/globalworming/20230628-meetup-refactor-playwright-js-to-screenplay/assets/2108984/2746490f-227a-437f-ac5f-40db2133387e)
https://hpmor.com/


![image](https://github.com/globalworming/20230628-meetup-refactor-playwright-js-to-screenplay/assets/2108984/3b3a9a2c-59a7-423d-a275-965d0419d666)
https://serenitydojo.teachable.com/
https://serenity-js.org/
