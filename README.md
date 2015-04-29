jQuery CuTree
===
Yet another jQuery plugin for tree structures

In development
---
See index.html for demo.. yet.

Basic use
---

The only requirements are jQuery and the plugin itself:

    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="jquery.cutree.js"></script>
    
There are two ways of initializing cutree elements - manually, by calling the cutree() function on jquery object that
contains the elements you want to be foldable, or automatically, by adding `cutree_init` class to elements you want to
be trees

Cutree will make all UL's inside LI's invisible (display:none). They will become visible upon clicking that LI. So the
basic usage would be:

    <ul class="cutree_init">
      <li>Length</li>
      <li>Format</li>
      <li>
        Genre
        <ul>
          <li>Blues</li>
          <li>Pop</li>
          <li>Electronic</li>
        </ul>
      </li>
    <li>
    
Which should work without a line of css code or any additional JS.

Of course, you can init cutree manually. Say, for a tree with `id="my_tree"`:

    <script type="text/javascript">
        $(function(){
            $('#my_tree').cutree();
        });
    </script>

(after the jquery and cutree inclusion)

Customization
---
At this point it may get a bit tricky. Or not, if you are familiar with CSS. 

Cutree will add classes to elements affected. The root element will get `cutree` class. The li that was clicked, so
its children are now visible, will get a `cutree_opened` class. The li that IS clickable (has children) will get a
`cutree_children` class. Wrapped (see below) elements will get `cutree_wrap` class.

There are several 'demo' css files in example_css folder, you can simply add them to your project and then add
corresponding classes:
