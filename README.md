# Covers Carousel

This is a death simple, mobile friendly, carousel plugin for jQuery.

It is intended to be used with books covers, to give a behaviour similar to Shelfari carousels.

The architecture is really simple and item-agnostic. That is, the plugin has no notion of the items width
 or of the number of items. It simply shows you the items inside the container and does the calculations
 to go forward and backward. 
 
 Layout of items and their spacing is up to you, and the plugin will work fine
 with any customisation.
 
 The amount of items slided when you click next/prev items depends on the carousel container 
 (and so it can depend on the viewport length).
 
 For example, if there are 7 visible items, then moving forward will move the carousel to the 8th element.
 If you resize the page and there is only one visible item, moving forward will show the second item.
 
 I've found this approach very effective, since it allows you to put items of different sizes in the carousel,
 with the layout you want, giving at the same time an usable behaviour on small viewports.
 
