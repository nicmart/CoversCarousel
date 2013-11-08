/*
 *  Covers Carousel - v0.1
 *  A death-simple, mobile-friendly cover carousel plugin
 *  http://jqueryboilerplate.com
 *
 *  Made by Nicolò Martini
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "coversCarousel";
    var defaults = {
        innerWrapperSelector: ".carousel-items",
        itemSelector: ".item",
        nextSelector: ".next",
        prevSelector: ".prev"
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = $(element);
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            
            this.innerWrapper = this.element.find(this.options.innerWrapperSelector);
            
            this.element.on('click', this.options.nextSelector, function(e) {
                e.preventDefault();
                this.moveForward();
            });
            
            this.element.on('click', this.options.prevSelector, function(e) {
                e.preventDefault();
                this.moveBackward();
            });
        },
        items: function() {
            return this.element.find(this.options.itemSelector);  
        },
        moveTo: function(elem) {
            this.innerWrapper.css({"left": -$(elem).position().left + 'px'})   
        },
        moveForward: function(){
            this.moveTo(this.firstNotVisible());
        },
        moveBackward: function(){
            this.moveTo(this.backwardFirst());
        },
        firstVisible: function()
        {
            var items = this.items();            
            var offset = parseInt(this.innerWrapper.css("left"))
            
            for (i = 0; i < items.length; i++) {
                var $item = $(items[i]);
                if ($item.position().left + offset >= 0)
                    return $item;
            }
            
            return items[0];
        },
        firstNotVisible: function()
        {
            var containerWidth = this.element.width();
            var $first = $(this.firstVisible());
            var current = cyclicNext($first);
            
            while (isStrictlyAfter($first, current) && width($first, current) <= containerWidth) {
                current = cyclicNext(current);
            }
            
            return current;
        },
        backwardFirst: function()
        {
            var containerWidth = this.element.width();
            var newEnd = cyclicPrev(this.firstVisible())
            var current = cyclicPrev(newEnd)
            
            while (isStrictlyAfter(current, newEnd) && width(current, newEnd) <= containerWidth) {
                current = cyclicPrev(current);
            }
            
            return cyclicNext(current);
        }
    };
    
    // Private methods
    function cyclicNext(elem)
    {
        $elem = $(elem);
        if ($elem.next().length)
            return $elem.next();
            
        return $elem.parent().children().first();
    }

    function cyclicPrev(elem)
    {
        $elem = $(elem);
        if ($elem.prev().length)
            return $elem.prev();
            
        return $elem.parent().children().last();
    }
    
    function isAfter(elem, after)
    {
        return $(elem).nextAll().andSelf().filter(after).length > 0;
    }
    
    function isStrictlyAfter(elem, after)
    {
        return $(elem).nextAll().filter(after).length > 0;
    }
    
    function width(elem1, elem2)
    {
        var $elem1 = $(elem1), $elem2 = $(elem2);
        
        return $elem2.position().left - $elem1.position().left + $elem2.outerWidth();
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, pluginName ) ) {
                $.data( this, pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );
