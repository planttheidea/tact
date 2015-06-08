# tact

### CSS like a Sir

So you've been using Bootstrap for a while, that's cool. Maybe you dig stuffing their markup full of non-semantic classes. Maybe you like having nonatuply-nested div soup to create a nested grid. Personally, I like my CSS to be dedicated to style, I want a semantic way to separate out how the data is organized from the padding I have on a container. I want my CSS to be simple, elegant. Tactful.

##### Enter Tact CSS

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
  <div data-column-md="1/2">
    Half of one
  </div>
  
  <div data-column-md="1/2">
    Half of another
  </div>
</div>
```
We know, its not too crazy different, but humor us and look at the markup. You're grid is established by *attributes*, which is kind of a big deal because it is *declarative*. Attributes have dedicated styling, and they are declaratively reflective of how the data is organized, so the code is far more readable (wouldn't you rather just see "1/2" instead of calculate 6 is half of 12?) and there are some defaults which prevent the need for excess markup (hence the lack of need for the xs stacked styling). The grid is especially powerful because you have all fractions (down to 1/24), but also all whole-number percentages from 1-100. 
```
<div data-grid>
  <div data-column-md="39%">
    This is practically
  </div>
  
  <div data-column-md="61%">
    The golden ratio
  </div>
</div>
```
Tell me you've never had to create custom classes because 12-column-fits-all didn't cut it. No worries man, we got your back.

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
          
          <li data-submenu>
              <a href="#">
                  Menu item two
              </a>
              
              <ul data-menu-list>
                <li>
                    <a href="#">
                        Submenu item one
                    </a>
                </li>
                
                <li>
                    <a href="#">
                        Submenu item two
                    </a>
                </li>
            </ul>
          </li>
      </ul>
  </nav>
</header>
```
Yes, yes ... data attributes galore, but keep your eye on the prize! If you've worked with Bootstrap, this is **way** more concise (there is something like 12 classes used for this same setup), but wait ... what's that value on data-mobile-menu?. Tabs? ... Yes, there are multiple mobile menus. Right now there are two, with the default as the delicious hamburger, but if you want to use tabs (much better from a UX perspective) just add that value to the attribute. Also, the menu bar is by default vertical, so if you wanted to make it horizontal ... you got it, just set *data-menu-bar="horizontal"*.

**Is this legal? Using attributes for CSS?**

Yup, and the use of data- as a prefix on everything makes it valid HTML as well. Don't go blabbing to the fuzz or anything, though.

**What about specificity? I've never used attributes in CSS before.**

Attributes have the exact same level of specificity as classes, so it's a one-to-one setup if you want to override the CSS with custom stuff. Additionally, the specificity level for a lot of the elements is lower than Bootstrap, which should keep your overrides CSS file small(er) if you don't want to mod the LESS files directly.

**What about performance? Aren't classes faster?**

True, however attributes are really not that much slower than classes. Ben Frain did an <a href="http://benfrain.com/css-performance-revisited-selectors-bloat-expensive-styles/" target="_blank">excellent write-up in 2014 on the performance of different CSS selectors</a> with a massive DOM tree and determined the different between fastest and slowest was negligible (31ms was the largest difference).

**This is weird, what's wrong with using classes? Everyone does it.**

Not very open-minded of you, but I'll play along ... there's nothing wrong with it, its just not very semantic. This library was built for those that wanted human-readable, semantic HTML markup that is separated by concern. Plus ... why not?

This is just the beginning, both from a dev and documentation perspective. I'll be putting together a site down the road to show all of the elements involved and how they interact with one another. Stay tuned!

Oh, one last thing ... beginning work on some basic UI components in AngularJS. They don't enhance the CSS by any means, but they provide the out-of-the-box functionality the CSS styles for (such as tabs, datepickers, etc). The only dependency for them other than AngularJS itself is momentJS if you are using the datepicker.
