# tact

### CSS like a sir

So you've been using Bootstrap for a while, that's cool. Maybe you dig stuffing their markup full of non-semantic classes. Maybe you like having nonatuply-nested div soup to create a nested grid. Personally, I like my CSS to be dedicated to style, I want a semantic way to separate out how the data is organized from the padding I have on a container. I want my CSs to be simple, elegant. Tactful.

### Enter Tact CSS

Alright mustacheod monocle man, you have me intriged. How about some examples?

Sure. How about the almighty grid? Bootstrap:

```
<div class="grid">
  <div class="row">
    <div class="col-xs-12 col-md-6">
      Half of one
    </div>
    
    <div class="col-xs-12 col-md-6">
      Half of another
    </div>
  </div>
</div>
```

And now Tact:

```
<div data-grid>
  >div data-column-md="1/2">
    Half of one
  </div>
  
  >div data-column-md="1/2">
    Half of another
  </div>
</div>
```

We know, its not too crazy different, but humor us and look at the markup. You're grid is established by *attributes*, which is kind of a big deal because it is *declarative*. Attributes have dedicated styling, and they are declaratively reflective of how the data is organized, so the code is far more readable (wouldn't you rather just see "1/2" instead of calculate 6 is half of 12?). By the way, the grid is especially powerful because you have all fractions (down to 1/24), but also all whole-number percentages from 1-100. We all know you secretly want to create a 37-19-24-20 grid, and we want to make it happen.

I won't bore you too much longer, but one more thing ... check this out:

```
<header data-menu-bar>
  <nav data-menu data-mobile-menu="tabs">
      <a href data-brand>
          buhjit
      </a>
  
      <ul data-menu-list>
          <li class="active">
              <a href="#">
                  Menu item one
              </a>
          </li>
          <li data-submenu class="active">
              <a href="#">
                  Menu item two
              </a>
              
              <ul data-menu-list>
                <li class="active">
                    <a href="#">
                        Menu item one
                    </a>
                </li>
                <li class="active">
                    <a href="#">
                        Menu item two
                    </a>
                </li>
            </ul>
          </li>
      </ul>
  </nav>
</header>
```

Yes, yes ... data attributes galore, but keep your eye on the prize! If you've worked with Bootstrap, this is **way** more concise (there is something like 12 classes used for this same setup), but wait ... what's that value on data-mobile-menu?. Tabs? ... Yes, there are multiple mobile menus. Right now there are two, with the default as the delicious hamburger, but if you want to use tabs (much better from a UX perspective) just add that value to the attribute. Also, the data-menu is by default vertical, so if you wanted to make it horizontal ... you got it, just set *data-menu="horizontal"*.

This is just the beginning, both from a dev and documentation perspective. I'll be putting together a site down the road to show all of the elements involved and how they interact with one another. Stay tuned!
