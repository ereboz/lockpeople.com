/**
 * Created by javaBoxer on 3/29/2018
 */

$(document).ready(function(){
    
    // hero carousel
     $('.owl-carousel').owlCarousel({
        autoplay:false,
        margin:10,
        nav:true,
        dots:true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:1,

            },
            1000:{
                items:1,
            }
        }
    })



    // Checkout Page - move the shopping cart section from the bottom of the page to the top
    // above "Account"
    
    var cartDetails = $(".checkout-details .cart-details");
    var checkoutAccount = $(".checkout-details .checkout-account");
    $(cartDetails).remove();
    $(cartDetails).insertBefore(checkoutAccount);
    
});


$(window).load(function() {
    var loc = window.location.href.toLowerCase();
    var locPath = window.location.pathname.toLowerCase();
    var viewportWidth = $(window).width();
    var pageWrapper = "";
    var addContainer = "";
    var remContainer = "";
    

    
    // *************** BACK PAGES ONLY ***************

    // add container class to backpages. cant use this on homepage cuz it wont allow full width carousel (shared in _Layout.cshtml)
    if (locPath !== "/") {
        addContainer = $(".body-wrapper");
        $(addContainer).addClass("backpage-wrapper");
        $(addContainer).addClass("container");

        // $(".notice-area").css("display", "none");
        // $(".notices").css("display", "none");
    }

    // remove class container from savlok page to allow full width
    if (locPath === "/topic/savlok") {
        addContainer = $(".body-wrapper");
        $(addContainer).removeClass("container");

    }
    
    // *************** HOME PAGE ONLY ***************

    if (locPath === "/") {
        addContainer = $(".body-wrapper");
        $(addContainer).addClass("homepage-wrapper");

        $(".notice-area").css("display", "none");
        $(".notices").css("display", "none");
    }
    
    
// *************** BILL TO/SHIP TO ADDRESS FORM (from checkout page) ***************

// NEED TO MAKE THE ADD NEW SHIPPING, ADD NEW BILLING ADDRESS .container CLASS 50% WIDTH TO REDUCE THE SIZE AND CENTER IT ON SCREEN
// FOR DESKTOP > 800PX.
// IT DOES NOT HAVE A UNIQUE CLASS AND SETTING WIDTH ON .container AFFECTS EVERY PAGE ON THE SITE.
// READ IN THE URL AND APPLY STYLING ONLY TO THE ADDRESS PAGE for SHIPPING/BILLING(address/detail)
// APPLIES TO:
// https://combolock.com/address/detail
    
    if (loc.indexOf('/address/detail') > -1) {
        pageWrapper = $(".create-account-page");
        $(pageWrapper).addClass("addressMobileWidth");
        
        if (viewportWidth > 800) {
            $(pageWrapper).removeClass("addressMobileWidth").addClass("addressDesktopWidth");
        }
        
        $(window).resize(function () {
            var viewportWidth = $(window).width();
            if (viewportWidth < 800) {
                $(pageWrapper).removeClass("addressDesktopWidth").addClass("addressMobileWidth");
            }
            if (viewportWidth > 800) {
                $(pageWrapper).removeClass("addressMobileWidth").addClass("addressDesktopWidth");
            }
        });
    }
    
    // *************** CONTACT US PAGE ***************
    // Center the page with a left margin class when in Desktop view > 800px
    
    if (loc.indexOf('/contactus') > -1) {
        pageWrapper = $(".contact-us-page");
        $(pageWrapper).addClass("contactMobileWidth");
        
        if (viewportWidth > 800) {
            $(pageWrapper).removeClass("contactMobileWidth").addClass("contactDesktopWidth");
        }
        
        $(window).resize(function () {
            var viewportWidth = $(window).width();
            if (viewportWidth < 800) {
                $(pageWrapper).removeClass("contactDesktopWidth").addClass("contactMobileWidth");
            }
            if (viewportWidth > 800) {
                $(pageWrapper).removeClass("contactMobileWidth").addClass("contactDesktopWidth");
            }
        });
        
        // Replace all occurrences of (required) to *
        
        $('.form-label-suffix-required').each(function() {
            var txt = $(this).html();
            txt = txt.replace('(required)','*');
            $(this).html(txt);
        });
        
    }
    
});



/**
 * @preserve
 * Project: Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Version: v2.2.1
 * Contributors: Mattia Larentis
 * Dependencies: Bootstrap's Dropdown plugin, jQuery
 * Description: A simple plugin to enable Bootstrap dropdowns to active on hover and provide a nice user experience.
 * License: MIT
 * Homepage: http://cameronspear.com/blog/bootstrap-dropdown-on-hover-plugin/
 */
;(function ($, window, undefined) {
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function (options) {
        // don't do anything if touch is supported
        // (plugin causes some issues on mobile)
        if('ontouchstart' in document) return this; // don't want to affect chaining

        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent());

        return this.each(function () {
            var $this = $(this),
                $parent = $this.parent(),
                defaults = {
                    delay: 500,
                    hoverDelay: 0,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    hoverDelay: $(this).data('hover-delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                showEvent   = 'show.bs.dropdown',
                hideEvent   = 'hide.bs.dropdown',
                // shownEvent  = 'shown.bs.dropdown',
                // hiddenEvent = 'hidden.bs.dropdown',
                settings = $.extend(true, {}, defaults, options, data),
                timeout, timeoutHover;

            $parent.hover(function (event) {
                // so a neighbor can't open the dropdown
                if(!$parent.hasClass('open') && !$this.is(event.target)) {
                    // stop this event, stop executing any code
                    // in this callback but continue to propagate
                    return true;
                }

                openDropdown(event);
            }, function () {
                // clear timer for hover event
                window.clearTimeout(timeoutHover)
                timeout = window.setTimeout(function () {
                    $this.attr('aria-expanded', 'false');
                    $parent.removeClass('open');
                    $this.trigger(hideEvent);
                }, settings.delay);
            });

            // this helps with button groups!
            $this.hover(function (event) {
                // this helps prevent a double event from firing.
                // see https://github.com/CWSpear/bootstrap-hover-dropdown/issues/55
                if(!$parent.hasClass('open') && !$parent.is(event.target)) {
                    // stop this event, stop executing any code
                    // in this callback but continue to propagate
                    return true;
                }

                openDropdown(event);
            });

            // handle submenus
            $parent.find('.dropdown-submenu').each(function (){
                var $this = $(this);
                var subTimeout;
                $this.hover(function () {
                    window.clearTimeout(subTimeout);
                    $this.children('.dropdown-menu').show();
                    // always close submenu siblings instantly
                    $this.siblings().children('.dropdown-menu').hide();
                }, function () {
                    var $submenu = $this.children('.dropdown-menu');
                    subTimeout = window.setTimeout(function () {
                        $submenu.hide();
                    }, settings.delay);
                });
            });

            function openDropdown(event) {
                if($this.parents(".navbar").find(".navbar-toggle").is(":visible")) {
                    // If we're inside a navbar, don't do anything when the
                    // navbar is collapsed, as it makes the navbar pretty unusable.
                    return;
                }

                // clear dropdown timeout here so it doesnt close before it should
                window.clearTimeout(timeout);
                // restart hover timer
                window.clearTimeout(timeoutHover);
                
                // delay for hover event.  
                timeoutHover = window.setTimeout(function () {
                    $allDropdowns.find(':focus').blur();

                    if(settings.instantlyCloseOthers === true)
                        $allDropdowns.removeClass('open');
                    
                    // clear timer for hover event
                    window.clearTimeout(timeoutHover);
                    $this.attr('aria-expanded', 'true');
                    $parent.addClass('open');
                    $this.trigger(showEvent);
                }, settings.hoverDelay);
            }
        });
    };

    $(document).ready(function () {
        // apply dropdownHover to all elements with the data-hover="dropdown" attribute
        $('[data-hover="dropdown"]').dropdownHover();
    });
})(jQuery, window);