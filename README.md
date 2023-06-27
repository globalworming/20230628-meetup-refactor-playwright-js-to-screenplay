# Slides

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
* this is what the script might look like when we use screenplay (result, main branch)
* 

* benefits:
  * easy modeling multiple actors, user and admin
  * nice reports
  * does also encompas other interfaces, write steps for API, DB, ....
* drawbacks
  * tons of actions, findability, accidental duplication...
  * stacktrace indirection, another layer, error in `attemptsTo`
  * sharing state between steps, remember/recall is unusual and might get unwieldy 
