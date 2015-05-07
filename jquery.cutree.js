(function($){

    var strings = {
        class_opened:'cutree_opened',
        class_children:'cutree_children',
        class_main:'cutree',
        class_wrap:'cutree_wrap',
        class_autoinit:'cutree_init',

        class_shiftkey:'cutree_shift',

        event_init_cutree:'tree_init',
        event_change_state:'tree_change_state',

        tag_parent:'ul',
        tag_children:'li',
        tag_wrap:'span'
    };

    var default_options = {
        wrap:true,
        shift:true
    };

    var toggleItem = function(target,visible) {

        target
            .toggleClass(strings.class_opened,visible)
            .children(strings.tag_parent).toggle(visible)
            .trigger(strings.event_change_state,visible);

    };

    var click = function(e){

        var targetElement = e.toElement;
        var target = $(targetElement);

        // TODO: Check if not too twisted
        if(target.parent().hasClass(strings.class_children))target = target.parent();

        if(target.hasClass(strings.class_children)){

            var visible = !target.hasClass(strings.class_opened);
            toggleItem(target, visible);

            if(e.shiftKey && $(this).hasClass(strings.class_shiftkey)) {
                console.log(target.find('.'+strings.class_children).each(function(){
                    toggleItem($(this),visible);
                }));
            }
        }

        e.stopPropagation();
        return false;
    };

    var wrap = function(element) {

        element
            .find('.'+strings.class_children).contents().filter(function(){     // Finding all nodes inside li elements
                return this.nodeType === 3 && $.trim(this.textContent) != '';   // filtering out tag nodes and empty
            })                                                                  // text nodes.
            .wrap('<'+strings.tag_wrap+' class="'+strings.class_wrap+'"/>');    // Then wrapping remaining non-empty
                                                                                // text nodes with span tag.
    };

    var init = function(element,options){

        $(window).trigger(strings.event_init_cutree,element);
        element.toggleClass(strings.class_shiftkey,options.shift);
        element
            .addClass(strings.class_main)
            .click(click)
            .find(strings.tag_parent).hide()
            .parent().addClass(strings.class_children);

        if(options.wrap) {
            wrap(element);
        }

    };

    $.fn.cutree = function(options){
        options = $.extend(default_options,options);

        return this.each(function(){
            init($(this),options);
        });
    };

    $(function(){
        $('.'+strings.class_autoinit).cutree();
    });

})(jQuery);