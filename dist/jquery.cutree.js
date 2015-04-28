(function($){

    var strings = {
        class_opened:'cutree_opened',
        class_children:'cutree_children',
        class_main:'cutree',
        class_wrap:'cutree_wrap',

        event_change_state:'tree_change_state',
        event_open:'tree_open',
        event_close:'tree_close',

        tag_parent:'ul',
        tag_children:'li',
        tag_wrap:'span'
    };

    var click = function(e){

        var targetElement = e.toElement;
        var target = $(targetElement);

        // TODO: Fix this repetition
        if(target.parent().is('.'+strings.class_children))target = target.parent();

        if(target.is('.'+strings.class_children)){
            target
                .toggleClass(strings.class_opened)
                .children(strings.tag_parent).toggle().trigger(strings.event_change_state)
                .each(function(){
                    var visible = $(this).is(':visible');
                    $(this).trigger(visible?strings.event_open:strings.event_close);
                });
        }
        e.stopPropagation();
        return false;
    };

    var init = function(element){

        element
            .addClass(strings.class_main)
            .click(click)
            .find(strings.tag_parent).hide()                //hiding all ul elements inside ours
            .parent().addClass(strings.class_children);     //adding class that indicates that element has children

        // Wrapping non-empty text nodes.
        // TODO: Fix the mess
        element
            .find('.'+strings.class_children).contents().filter(function(){
                return this.nodeType === 3 && $.trim(this.textContent) != '';
            })
            .wrap('<'+strings.tag_wrap+' class="'+strings.class_wrap+'"/>');

    };

    $.fn.cutree = function(){
        return this.each(function(){
            init($(this));
        });
    };

})(jQuery);