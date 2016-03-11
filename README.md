Angular directive lifecycle
====


Proper usage of `compile`, `link` and `controller` in Angular directives.

Simple directive 
----
```
app.directive('simple', function() {
  return {};
});
```
```
<simple></simple>
```

Functions invoked upon calling `simple` directive
----

```
1. directive.compile($element, ...)
2. directive.controller($element, $scope, ...)
3. directive.preLink($element, $scope, ...)
4. directive.link($element, $scope, ...)
```
> Even a simple `simple` directive triggers a full *lifeCycle*.

> The *Link* function is all you need and *Compile*, *Controller*, *PreLink* are useless in this case.

Why do we need controller in directive?
----

Lets take a look at nested directives diagram:

```
<learn>   -> learn: find children
  <life>    -> life: find children
    <cycle>   -> cycle: find children
    </cycle>  -> compile(cycle)
  </life>   -> compile(life)
</learn>  -> compile(learn)

<learn>   -> learn.controller($scope)
            -> learn.preLink()
  <life>      -> life.controller($scope) // require "^learn"
                -> life.preLink()
    <cycle>       -> cycle.controller($scope) // require "^life"
                    -> cycle.preLink()
                    -> cycle.link($scope, elements, attrs, lifeCtrl)
                  -> life.link($scope, elements, attrs, learnCtrl)
                -> learn.link($scope, elements, attrs, learnCtrl)
```
> On the above diagram you can see an order in which directives are created. It happens twice, first the DOM is traversed and all tags are compiled. In the second iteration controllers and link functions are called.

> As you see <life> link function is called before <learn>’s link – that means <life> can’t retrieve any information/configuration from <learn> at this point. As a solution for this a controller is created before directive is fully initialized. Thanks to this, <life> can access <learn> controller, even though <learn> hasn’t yet finished creation process. So to sum up: Controllers allow directives talk to each other before they get fully initialized.


Why do we need a compile function?
----

For optimization purposes. Directives such as ng-repeat compiles repeated elements first, and then just clone. After cloning only controller and link function is called. So if you can, try to put stuff into compile function, so it’s not repeated when not necessary.

Summary
----
Directives have many mysterious features when you first come across them, but with some time and experiments like these you can at least figure out the working pieces. As always, the harder part is knowing how to apply this knowledge to the real components you need to build. More on that in the future.
