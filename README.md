# Slides

* this is me, what i do etc.. reuse the prezi slides
  *  
* goal: show bad code, hopefully show something that is better in the end
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
    * refactor to POM
  * and to adapt the report, use `test.step`
* this is what the script might look like when we use POM (branch)
   * cool and all, but i don't like the duplication
   * we can group the steps, get rid of the comments, use test.step here... but screenplay is cool, so lets show that
   * this is screenplay (show model) and we are adapting it a bit to 
* this is what the script might look like when we use screenplay (result, main branch)
* 

* benefits:
  * easy modeling multiple actors, user and admin
  * nice reports
  * does also encompas other interfaces, write steps for API, DB, ....
* drawbacks
  * tons of actions, findability, duplication...
  * stacktrace indirection, another layer, error in `attemptsTo`
  * sharing state between steps, remember/recall is unusual and might get unwieldy 
