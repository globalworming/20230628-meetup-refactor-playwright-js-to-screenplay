# Slides
![image](https://github.com/globalworming/20230628-meetup-refactor-playwright-js-to-screenplay/assets/2108984/f7c49a67-195f-490e-9e84-c92c90b0cb0e)


![image](https://github.com/globalworming/20230628-meetup-refactor-playwright-js-to-screenplay/assets/2108984/6b39f992-0fb8-45f5-b727-cb0625ca4fae)

![image](https://github.com/globalworming/20230628-meetup-refactor-playwright-js-to-screenplay/assets/2108984/159d89bb-fdcc-4ff9-b21e-3aa7eca137a5)


* this is me, what i do etc.. reuse the prezi slides
  *  
* goal:
  * show bad code, hopefully show something that is better in the end
  * you learn something about POM
*  
* this is is our SUT, default presta shop.
  * yes, boring (change stuff to make is more visually appealing? 
  *     
* this is what we wanne check: most valueable thing (reuse the mountain?)
  * 
* this is what the script might look like when we use recorders (branch)
  * and this is the report 
  * unmaintainable
  * show adding comments
  * goto pattern is POM
    * new HomePage goto.. and now? Homepage.pickSliderProduct(..) no... you create ProductSlider page object  
    * refactor to POM
* and to adapt the report, use `test.step`
  * introduce everywhere
* create steps package, point out duplication in function names and test.step
* lets see how screenplay pattern would look like
* this is screenplay (show model)
  * ![image](https://github.com/globalworming/20230628-meetup-refactor-playwright-js-to-screenplay/assets/2108984/dad7140d-57ec-4eb7-ba94-ce5c4d500b41)

  * we'll do a minimalistic implementation
  * ignore abilities for now
* implement:
  * start new Actor(name)
  * add actor attemptsTo for first step
  * add actor page
  *     class Actor {
            page;
        
            constructor(name) {
                this.name = name;
            }
        
            attemptsTo = async (task) => {
                const transform = str => str.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);
                return test.step(transform(task.constructor.name) + " " + JSON.stringify(task.args), async () => await task.performAs(this))
            }
        
        }
  * add second step, call both in attemptsTo
  * add an ensure task
  * replace FIllPersonalData, introduce notepad, replace product name
  * replace all in order product
    * see. no POM needed
      * well, I lied, show locator object
* this is what the script might look like when we use screenplay (result, main branch)
* questions? and did you just add an assert in the steps

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
