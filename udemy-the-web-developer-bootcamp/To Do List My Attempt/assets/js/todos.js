// On() means that this will apply to all future potential ul items added too
// We place the event listener on the ul itself, and say anytime an li is clicked within the ul, run the function. That optional argument is called childSelector.
// On the other hand, simply applying the event listener onto li will not work, because it will only add the listeners to the existing lis and not to any future ones.
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});

// Click on X to delete ToDo
$('ul').on("click", "i", function(event){
    // Remove the entire <li> using .parent(), not just the span.
    // this here refers to the span.
    $(this).parent().fadeOut(500, function(){
        // Note that this here refers to the parent <li> element that was clicked on
        $(this).remove();
    });
    // Prevent event bubbling
    event.stopPropagation();
})

$('input[type="text"]').on("keypress", function(event){
    if (event.which === 13){
        var new_item = $(this).val();
        var new_item_html = '<li> <span><i class="fas fa-trash"></i></span> ' + new_item + '</li>';
        $('ul').append(new_item_html);
        $(this).val("");
    }
})

// Note: We cannot directly add an event listener to the icon, as FontAwesome ver. 5 and later converts the icon to an SVG. Therefore, we must wrap a span around the
// icon, and apply the event listener to the span itself.
$('#plus').click(function(){
    $("input[type='text']").fadeToggle();
})